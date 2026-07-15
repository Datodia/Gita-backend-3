require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

app.use(cors({ origin: '*' }))
app.use(express.json())

// shared group room id (same value on client + server)
const GROUP_ID = 'group:general'

// connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('mongo connected'))
    .catch((err) => console.error('mongo connection error', err))

// one document per message — DMs use `to`, group messages use `room`
const messageSchema = new mongoose.Schema({
    from: { type: String, required: true }, // sender email
    fromName: { type: String }, // sender display name (group)
    to: { type: String }, // recipient email (DM only)
    room: { type: String }, // group room id (group only)
    text: { type: String, required: true },
    ts: { type: Number, required: true }, // client-visible timestamp
})

const Message = mongoose.model('Message', messageSchema)

app.get('/', (req, res) => {
    res.send('hello world')
})

// email -> { fullName, socketId }
const onlineUsers = {}

io.on('connection', (socket) => {
    console.log('User connected', socket.id)

    // User logs in and announces presence
    socket.on('add:online', ({ email, fullName }) => {
        onlineUsers[email] = { fullName, socketId: socket.id }
        socket.data.userEmail = email

        // personal room so we can DM by email even if modal not open yet
        socket.join(email)
        // everyone shares one group room
        socket.join(GROUP_ID)

        io.emit('online:users', onlineUsers)
    })

    // Client asks for a saved conversation: a DM (user + peer) or the group (room)
    socket.on('history:load', async ({ user, peer, room }) => {
        try {
            const query = room
                ? { room }
                : {
                      $or: [
                          { from: user, to: peer },
                          { from: peer, to: user },
                      ],
                  }

            const messages = await Message.find(query).sort({ ts: 1 }).lean()

            // `chat` is the client-side conversation key (peer email or room id)
            socket.emit('history:load', { chat: room || peer, messages })
        } catch (err) {
            console.error('history load error', err)
        }
    })

    // Direct message between two users, delivered to both personal rooms
    socket.on('message:private', async ({ from, to, text }) => {
        const message = { from, to, text, ts: Date.now() }

        // persist first so a reconnect can restore it
        try {
            await Message.create(message)
        } catch (err) {
            console.error('message save error', err)
        }

        io.to(to).to(from).emit('message:private', message)
    })

    // Group message, delivered to everyone in the shared room
    socket.on('message:group', async ({ from, fromName, text }) => {
        const message = { from, fromName, room: GROUP_ID, text, ts: Date.now() }

        try {
            await Message.create(message)
        } catch (err) {
            console.error('group message save error', err)
        }

        io.to(GROUP_ID).emit('message:group', message)
    })

    socket.on('disconnect', () => {
        const email = socket.data.userEmail
        if (email) {
            delete onlineUsers[email]
            io.emit('online:users', onlineUsers)
        }
        console.log('User disconnected', socket.id)
    })
})

server.listen(4000, () => {
    console.log('server running on http://localhost:4000')
})

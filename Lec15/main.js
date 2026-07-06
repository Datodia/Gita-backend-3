const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const users = [
    {
        id: 1,
        "name": "giorgi",
        age: 22,
    },
    {
        id: 2,
        "name": "nika",
        age: 24,
    },
     {
        id:3 ,
        "name": "mari",
        age: 25,
    },
]

app.get('/', (req, res) => {
    res.render('pages/home.ejs', {name: "hello from ejs", metaData: 'users page', users})
})

app.get('/create-user',  (req, res) => {
    res.render('pages/create-user.ejs')
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    res.render('pages/user-details.ejs', {user})
})

app.get('/users/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(u => u.id === id)

    res.render('pages/user-edit.ejs', {user})
})


app.get('/api/users', (req, res) => {
    res.json(users)
})

app.post('/api/users', (req, res) => {
    const {name, age} = req.body
    const lastId = users[users.length - 1]?.id || 0
    const newUser = {
        id: lastId+1,
        name,
        age: Number(age)
    }

    users.push(newUser)
    res.redirect('/')
})

app.get('/api/users/:id/delete', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex(u => u.id === id)

    if(index === -1){
        return
    }

    users.splice(index, 1)

    res.redirect('/')
})

app.post('/api/users/:id/update', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex(u => u.id === id)

    if(index === -1){
        return
    }

    const udpateReq = {}
    if(req.body.name){
        udpateReq['name'] = req.body.name
    }

    if(req.body.age){
        udpateReq['age'] = req.body.age
    }

    users[index] = {
        ...users[index],
        ...udpateReq
    }

    res.redirect('/')
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})
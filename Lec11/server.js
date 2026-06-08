

const http = require('http')
const url = require('url')

const users = [
    {id: 1, name: "giorgi", age: 22},
    {id: 2, name: "mariami", age: 26},
    {id: 3, name: "nika", age: 25},
]

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url)
    
    if(req.method === 'GET' && parsedUrl.pathname === '/'){
        res.writeHead(200, {'content-type': 'text/html'})
        return res.end('<h1 style="color: red;">Home page</h1>')
    }

    if(req.method === 'GET' && parsedUrl.pathname === '/users'){
        res.writeHead(200, {'content-type': 'application/json'})
        return res.end(JSON.stringify(users))
    }

    if(req.method === 'POST' && parsedUrl.pathname === '/users'){
        let body = ''
        req.on('data', (chunk) => {body += chunk})
        req.on('end', () => {
            const parsedBody = JSON.parse(body)
            const lastId = users[users.length - 1]?.id || 0
            const newUser = {
                id: lastId+1,
                name: parsedBody.name,
                age: parsedBody.age
            }
            users.push(newUser)
            res.writeHead(201, {"content-type": 'application/json'})
            return res.end(JSON.stringify({message: "user creted successfully"}))
        })
    }

    if(req.method === 'DELETE' && parsedUrl.pathname.startsWith('/users')){
        const userId = parsedUrl.pathname.split('/')[2]
        const index = users.findIndex((user) => user.id === Number(userId))
        if(index === -1){
            res.writeHead(404, {"content-type": 'application/json'})
            return res.end(JSON.stringify({message: "user not found"}))
        }

        users.splice(index, 1) 

        res.writeHead(200, {"content-type": 'application/json'})
        return res.end(JSON.stringify({message: "User deleted successfully"}))
    }

    if(req.method === 'GET' && parsedUrl.pathname === '/random'){
        res.writeHead(200, {'content-type': 'application/json'})
        const random = Math.floor(Math.random() * 100)
        return res.end(JSON.stringify({random}))
    }

})

server.listen(4000, () => {
    console.log('server running on port http://localhost:4000')
})


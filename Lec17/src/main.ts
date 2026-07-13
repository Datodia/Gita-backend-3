
import express from 'express'
import { loggerMiddleware } from './middlewares/log.middleware'
const app = express()


app.use(loggerMiddleware)
app.get('/', (req, res) => {
    res.send('hello reeducate 123')
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000')
})
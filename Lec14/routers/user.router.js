
const { Router } = require('express')
const UserController = require('../controllers/user.controller')

const userRouter = new Router()

// http://localhost:4000/users
userRouter.get('/', UserController.getAllUsers)
userRouter.post('/', UserController.createUser)
//http://localhost:4000/users/2
userRouter.get('/:id', UserController.getUserById)
userRouter.delete('/:id', UserController.deteleUserById)
userRouter.put('/:id', UserController.updateUserById)

module.exports = userRouter
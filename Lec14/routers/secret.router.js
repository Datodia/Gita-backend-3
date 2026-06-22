const { Router } = require("express");
const SecretController = require('../controllers/secret.controller')

const secretRouter = new Router()

secretRouter.get('/', SecretController.getSecret)

module.exports = secretRouter
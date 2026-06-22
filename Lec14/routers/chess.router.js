const { Router } = require("express");
const ChessController = require('../controllers/chess.controller')

const chessRouter = new Router()

chessRouter.get('/', ChessController.redirectChess)

module.exports = chessRouter
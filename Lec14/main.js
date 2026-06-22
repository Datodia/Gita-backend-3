const express = require("express");
const { readFile, writeFile } = require("./utils/fs.util");
const userRouter = require("./routers/user.router");
const chessRouter = require("./routers/chess.router");
const secretRouter = require("./routers/secret.router");
const userRouter2 = require("./users/user2.controller");
const loggerMiddleware = require("./middlewares/logger.middleware");
const isAdminMiddleware = require("./middlewares/is-admin.middleware");
const app = express();

// viewer, editor, admin

app.use(express.json());

//Global Middleware
app.use(loggerMiddleware)


// app.use('/users', userRouter)
app.use('/users', userRouter2)
app.use('/chess', chessRouter)
app.use('/secret', secretRouter)

app.get("/", (req, res) => {
  res.send('<h1 style="color: red;">hello world</h1>');
});


app.listen(4000, () => {
  console.log("server running on http://localhost:4000");
});

const express = require("express");
const userRouter2 = require("./users/user2.controller");
const loggerMiddleware = require("./middlewares/logger.middleware");
const app = express();
const connectToDb = require("./config/db.config");
const authRouter = require("./auth/auth.controller");
const postRouter = require("./posts/post.controller");
const multer = require("multer");
const upload = require("./middlewares/upload.middleware");
const { uploadFile } = require("./lib/cloudinary.lib");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// const limits = {
//   fileSize: 2 * 1024 * 1024, 
// };
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage, limits });

//Global Middleware
app.use(loggerMiddleware);

app.post("/upload", upload.single("image"), async (req, res) => {

  const resp = await uploadFile(req.file.buffer)

  res.json({
    message: "uploaded succesfullt",
    imgUrl: resp.url,
  });
});

// 5 is optional and it means max count of images
app.post('/upload-many', upload.array('images', 5), async (req, res) => {
  const uploadedFiles = []
  for(let i = 0; i < req.files.length; i++){
    const rep = await uploadFile(req.files[i].buffer)
    uploadedFiles.push(rep)
  }

  res.json({message: "uploaded suffesscylly", data: uploadedFiles})
})


app.use("/users", userRouter2);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send('<h1 style="color: red;">hello world</h1>');
});

connectToDb().then(() => {
  app.listen(4000, () => {
    console.log("server running on http://localhost:4000");
  });
});

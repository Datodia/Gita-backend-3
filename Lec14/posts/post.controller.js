const { Router } = require("express");
const validate = require("../middlewares/validate");
const { createPostDto } = require("./dto/create-post.dto");
const isAuthMiddleware = require("../middlewares/is-auth.middleware");
const PostService = require('./post.service');
const isValidMongoIdMiddleware = require("../middlewares/is-valid-mongo-id.middleware");
const upload = require("../middlewares/upload.middleware");

const postRouter = new Router()

postRouter.post('/', isAuthMiddleware, upload.single('postImage'), validate(createPostDto), async (req, res)=>{
    const {title, desc} = req.body
    const newPost = await PostService.createPost({title, desc, author: req.userId, file: req.file})

    res.status(201).json({message: "post created successfully"})
})

postRouter.get('/', async (req, res) => {
    const allPosts = await PostService.getAllPosts()
    res.json(allPosts)
})

postRouter.delete('/:id', isValidMongoIdMiddleware, isAuthMiddleware, async (req, res) => {
    const resp = await PostService.deletePostById(req.params.id, req.userId)
    if(resp === 'NOT_FOUND'){
        return res.status(404).json({message: "user not found"})
    }

    if(resp === 'PERMITION_DENIED'){
        return res.status(403).json({message: "permition denied"})
    }

    res.json({message: "post deleted successfully"})
})

module.exports = postRouter
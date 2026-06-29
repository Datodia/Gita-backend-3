const user2Model = require("../users/user2.model")
const postModel = require("./post.model")



exports.createPost = async ({title, desc, author}) => {
    const newPost = await postModel.create({title, desc, author})
    await user2Model.findByIdAndUpdate(author, {
        "$push": {posts: newPost._id}
    })


    return newPost
}

exports.getAllPosts = async ()=>{
    return await postModel.find().populate('author', 'email name isSmoker')
}

exports.deletePostById = async (postId, authroId) => {
    const existPost = await postModel.findById(postId)
    if(!existPost) {
        return "NOT_FOUND"
    }

    if(existPost.author.toString() !== authroId){
        return 'PERMITION_DENIED'
    }

    await postModel.findByIdAndDelete(postId)
    await user2Model.findByIdAndUpdate(authroId, {
        '$pull': {posts: existPost._id}
    })
    return "OK"
}
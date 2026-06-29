const { default: mongoose } = require("mongoose");


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('post', postSchema)
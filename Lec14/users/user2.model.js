const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isSmoker: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        default: []
    }]
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)
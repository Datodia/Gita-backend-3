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
    }
}, {timestamps: true})

module.exports = mongoose.model('user', userSchema)
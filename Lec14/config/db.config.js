const { default: mongoose } = require("mongoose")
require('dotenv').config()

module.exports = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB Connected sucessfully')
    }catch(e){
        console.log('Cound not connected DB', e)
    }
}
const cloudinary = require('../config/cloudinary.config')

const uploadFile = async (fileBuffer, folder = 'posts') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder, resource_type: 'image'}, 
            (err, result) => {
                if(err) reject(err)

                resolve({
                    url: result.secure_url,
                    publicId: result.public_id
                })
            }
        )

        stream.end(fileBuffer)
    })
}



const deleteFile = async (publicId) => {
    if(!publicId) return

    await cloudinary.uploader.destroy(publicId)
}



module.exports = {uploadFile, deleteFile}
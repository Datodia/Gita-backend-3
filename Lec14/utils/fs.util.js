
const fs = require('fs/promises')

async function readFile(filePath, isParse){
    if(!filePath) return console.log('file not provided')
    const readData = await fs.readFile(filePath, 'utf-8')

    return isParse ? JSON.parse(readData) : readData
}


async function writeFile(filePath, data){
    if(!filePath) return console.log('file not provided')
    await fs.writeFile(filePath, typeof data === 'string' ? data : JSON.stringify(data))
    console.log('written successfully')
}

module.exports = {writeFile, readFile}
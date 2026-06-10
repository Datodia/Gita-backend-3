import fs from 'fs/promises'

export async function readFile(filePath, isParse){
    if(!filePath) return console.log('file not provided')
    const readData = await fs.readFile(filePath, 'utf-8')

    return isParse ? JSON.parse(readData) : readData
}
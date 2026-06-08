

// console.log(__dirname, "dirnams")
// console.log(__filename, "filename")

const fs = require('fs/promises')
const path = require('path')

// await fs.appendFile('users.json', JSON.stringify({name: "giorgi", age: 22}))
// await fs.unlink('users.json')
// await fs.rm('test', {force: true, recursive: true})
// await fs.rename('rame.txt', 'first.txt')
// await fs.copyFile('first.txt', 'second.txt')
//5 => 5 * 4 * 3 * 2 * 1 =
// function factorial(n){
//     if(n === 1) return 1
//     return factorial(n - 1) * n
// }

// console.log(factorial(5))

async function main(filePath){
    const dirs = await fs.readdir(filePath)
    
    for(let dir of dirs){
        const fullDirPath = path.join(filePath, dir)
        const stat = await fs.stat(fullDirPath) 
        if(stat.isDirectory()){
           await main(fullDirPath)
        }
        const ext = await path.extname(fullDirPath)
        if(ext === '.txt'){
            await fs.unlink(fullDirPath)
        }
    }
}

main(__dirname)
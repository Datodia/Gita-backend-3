// const os = require('os')

// console.log(os.arch(),"os")
// console.log(os.cpus().length,"os")
// console.log(os.totalmem() / (1024 * 1024 * 1024),"os")
// console.log(os.freemem() / (1024 * 1024 * 1024),"os")
// console.log(os.hostname())
// console.log(os.version())

// CLI => Command Line Interface
// const [, , operation, num1, num2] = process.argv;

// if (operation === "sum") {
//   console.log(Number(num1) + Number(num2));
// }
// if (operation === "sub") {
//   console.log(Number(num1) - Number(num2));
// }

// process.on('exit', () => {
//     console.log('Process exit')
//     // sentNotificationToSlack()
// })

// console.log(1)


// setTimeout(() => {
//     console.log(2)
// }, 1000)


// process.exit(1)
// console.log(3)

// const operation = process.argv[2]
// const operation = process.argv[3]

const fs = require('fs/promises')
// გააკეთეთ words-cli ხელსაწყო(პროგრამა)
// node main.js first.txt => წაიკითხავს ამ ფაილს
// და დალოგავს შემდეგი ტიპის ინფომრაციას
// {word: 24, chars: 153}


async function main(fileName){
    try{
        const readData = await fs.readFile(fileName, 'utf-8')
        const wordCount = readData.replace(/[ ]{2,}/g, " ").split(' ')
        const totalChars = wordCount.join('')
        
        console.log({words: wordCount.length, chars: totalChars.length})
    }catch(e){
        console.log('Unknown fileName')
    }
}

main(process.argv[2])


// const [, , operation, name, age] = process.argv;
// გააკეთეთ users cli ხელსაწყპ(პროგრამა)
// node main.js add nika 22 => ეს დაამატებს users.json ში 
// ამ იუზერის ობიექტს. [{name: nika, age: 22}]
// node main.js add giorgi 30
// node main.js show => [{name: nika, age: 22}, {name: giorgi, age: 22}]

// async function main(operation, name, age){
//     if(operation === 'add'){
//         const readData = await fs.readFile('users.json', 'utf-8') || []
        
//         const parseData = readData.length > 0 ? JSON.parse(readData) : []
//         parseData.push({name, age})
//         await fs.writeFile('users.json', JSON.stringify(parseData))
//     }
//     if(operation === 'show'){
//         const readData = await fs.readFile('users.json', 'utf-8')
//         console.log(readData)
//     }
// }

// main(operation, name, age)


// დაწერეთ ფუნცქია რომელიც წაიკითხავს რიცხვებს numbers.txt-დან
// დააჯამებს ამ რიცხვებს და ჩაწერს result.txt-ში.

// წაიკითხეთ ინფორმაცია first.txt დან გააკეთეთ ამ სიტრვის reverse
// შებრუნებული და ჩაწერეთ ეს სიტყვა reverse.txt ფაილში.

// async function main(){
//     const readData = await fs.readFile('first.txt', 'utf-8')
//     const reverse = readData.split('').reverse().join('')
    
//     await fs.writeFile('reverse.txt', reverse)
// }

// async function main(){
//     const numbers = await fs.readFile('numbers.txt', 'utf-8')
//     const total = numbers
//                     .split(' ')
//                     .reduce((tot, cur) => tot + Number(cur), 0)
    
//     await fs.writeFile('result.txt', JSON.stringify(total))
//     // await fs.writeFile('users.json', JSON.stringify({name: "giorgi"}))
//     // await fs.unlink('users.json')
// }


// const data = fs.readFileSync('test.txt', 'utf-8')
// console.log(data,"data")
// console.log(1)


// fs.readFile('test.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err)
//         return
//     }

//     console.log(data, ": read Data")

//     fs.readFile('second.txt', 'utf-8', (err, data) => {
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log("second data: ", data)

        
//     })
// })

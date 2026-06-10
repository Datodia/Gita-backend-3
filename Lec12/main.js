import axios from 'axios'
import test from './utils.js'
// const formatDate = require('./utils/format-date')
import formatDate from './utils/format-date.js'
import { sum, mult } from './utils/math-utils.js'
import chalk from 'chalk'

import nodeFetch from 'node-fetch'

// nodeFetch('https://dummyjson.com/users')
//     .then(resp => resp.json())
//     .then(data => console.log(data, "data"))

// async function main(){
//     const resp = await nodeFetch('https://dummyjson.com/users')
//     const data = await resp.json()

//     console.log(data)
// }
// main()

async function main(){
    const response = await axios.get('https://dummyjson.com/users')
    console.log(response.data)
}
main()

console.log(chalk.blue("rame"))
console.log(chalk.bgBlue(sum(10, 20)))
console.log(chalk.red(mult(10, 20)))
console.log(chalk.bgRed(test(20, 20)))
console.log(chalk.bgBlueBright(formatDate('2026-06-10')))
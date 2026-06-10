#!/usr/bin/env node

import { Command } from 'commander'
import { readFile } from './utils/read-file.js'
import { writeFile } from './utils/write-file.js'

const program = new Command()

program
    .name('Test CLI using commander')
    .description('This is simple cli usage')
    .version('1.0.1')


program
    .command('hello')
    .description('this command returns hello world')
    .action(() => {
        console.log('hello world')
    })

program
    .command('sum')
    .description('this command sum two number')
    .argument('<num1>')
    .argument('<num2>')
    .action((num1, num2) => {
        console.log(Number(num1) + Number(num2))
    })

program
    .command('add-phone')
    .description('this command adds new phone in db')
    .argument('<name>', 'name of phone')
    .argument('<price>', 'price of phone')
    .option('-s, --stock <stock>', 'this is stock of phone', 10)
    .action(async (name, price, opts) => {
        const products = await readFile('products.json', true)

        const newPhone = {
            name,
            price: Number(price),
            stock: Number(opts.stock)
        }

        products.push(newPhone)
        await writeFile('products.json', products)
    })

program
    .command('get-all-phones')
    .option('-p, --price <price>', 'expensive products')
    .action(async (opts)=>{
        const products = await readFile('products.json', true)
        if(opts.price){
            return console.log(products.filter(prod => prod.price >= Number(opts.price)))
        }
        console.log(products)
    })

program.parse()
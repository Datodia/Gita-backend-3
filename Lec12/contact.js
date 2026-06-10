#!/usr/bin/env node

import { Command } from 'commander'
import { readFile } from './utils/read-file.js'
import { writeFile } from './utils/write-file.js'
import path from 'path'
const __dirname = import.meta.dirname;

const program = new Command()
const fullPath = path.join(__dirname, 'contacts.json')
program
    .name('Contact CLI')
    .description('This is simple contact cli tool')
    .version('1.0.0')


program
    .command('list')
    .description('this command returns all contact from db')
    .action(async () => {
        const contacts = await readFile(fullPath, true)
        console.log(contacts)
    })


program
    .command('add')
    .description('this command adds new contact in db')
    .argument('<phoneNumber>', 'phone number')
    .argument('<name>', 'name of user')
    .option('-g, --geo')
    .action(async (phoneNumber, name, opts) => {
        const contacts = await readFile(fullPath, true)
        const newContact = {
            name: name,
            phone: opts.geo ? `+995-${phoneNumber}` : phoneNumber
        }
        contacts.push(newContact)
        
        try{
            await writeFile(fullPath, contacts)
        }catch(e){
            console.log(e, "error")
        }
    })

program.parse()




#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command()

program
    .name('users CLI')
    .description('This is simple users cli tool')
    .version('1.0.0')


program
    .command('get-all-users')
    .description('this command returns all users from db')
    .action(() => {
        console.log('User list')
    })


program
    .command('add-user')
    .description('this command adds new user in db')
    .argument('<firstName>', 'full name of user')
    .argument('<lastName>', 'full name of user')
    .argument('<age>', 'full name of user')
    .argument('<isSmoker>', 'full name of user')
    .action((fullName,lastName, age, isSmoker) => {
        console.log({fullName, lastName, age, isSmoker})
    })

program.parse()



// შექმენით phone-cli რომელსაც ენქბა 2 ბრძანება
// phone-cli add 598-12-12-12 nika -g --geo => {name: "nika" ,
// number: "+995-598-12-12-12"}
// phone-cli show  fs/ contacts.json
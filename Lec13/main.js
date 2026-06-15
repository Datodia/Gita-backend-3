#!/usr/bin/env node


import {Command} from 'commander'
import { readFile, writeFile } from './utils/fs.util.js'

const program = new Command()

program
    .name('Movies Cli')
    .description('Simple movies CRUD CLI app')
    .version('1.0.0')



program
    .command('show')
    .description('this command returns list of movies')
    .option('-r, --random', 'this return rendom movie')
    .option('-s, --sort <sort>', 'this option sort by year')
    .option('-p, --page <page>', 'this is page', 1)
    .option('-t, --take <take>', 'this is page', 5)
    .option('-g, --genre <genre>', 'this return movies by genre')
    .action(async (opts) => {
        const movies = await readFile('movies.json', true)
        if(opts.genre){
            const filterdByGenre = movies.filter(movie => movie.genre.toLowerCase().startsWith(opts.genre.toLowerCase()))
            console.log(filterdByGenre)
            return
        }

        if(opts.random){
            const random = Math.floor(Math.random() * movies.length)
            console.log(movies[random])
            return
        }

        if(opts.sort === 'asc'){
            const sortedMovies = movies.sort((a,b) => a.year - b.year)
            console.log(sortedMovies)
            return
        }

        if(opts.sort === 'desc'){
            const sortedMovies = movies.sort((a,b) => b.year - a.year)
            console.log(sortedMovies)
            return
        }

        const page = Math.max(Number(opts.page), 1)
        const take = Math.min(Number(opts.take), 10)
        const result = movies.slice((page - 1) * take, page * take)
        console.log(result)
    })


program
    .command('add')
    .description('this command adds new movie in db')
    .argument('<name>', 'movie name field')
    .argument('<genre>', 'movie genre field')
    .argument('<year>', 'movie year field')
    .argument('<rating>', 'movie rating field')
    .action(async (name, genre, year, rating) => {
        const movies = await readFile('movies.json', true)
        const lastId = movies[movies.length - 1]?.id || 0

        const newMovie = {
            id: lastId+1,
            name,
            genre,
            year: Number(year),
            rating: Number(rating),
        }

        movies.push(newMovie)
        await writeFile('movies.json', movies)
    })


program
    .command('delete')
    .description('this command delete movie by id')
    .argument('<id>', 'unique id of movie')
    .action(async (id) => {
        const movies = await readFile('movies.json', true)
        const index = movies.findIndex(mov => mov.id === Number(id))
        if(index === -1){
            console.log('Wrong id provided')
            return
        }

        const deletedMovie = movies.splice(index, 1)
        await writeFile('movies.json', movies)

        console.log(`Deleted movie: ${JSON.stringify(deletedMovie[0])}`)
    })

program
    .command('update')
    .description('this command update movie by id')
    .argument('<id>', 'unique id of movie')
    .option('-n, --name <name>', 'name property')
    .option('-g, --genre <genre>', 'genre property')
    .option('-y, --year <year>', 'year property')
    .option('-r, --rating <rating>', 'rating property')
    .action(async (id, opts) => {
        const movies = await readFile('movies.json', true)
        const index = movies.findIndex(mov => mov.id === Number(id))
        if(index === -1){
            console.log('Wrong id provided')
            return
        }

        const updateReq = {}
        if(opts.name){
            updateReq['name'] = opts.name
        }
        if(opts.genre){
            updateReq['genre'] = opts.genre
        }
        if(opts.year){
            updateReq['year'] = Number(opts.year)
        }
        if(opts.rating){
            updateReq['rating'] = Number(opts.rating)
        }

        movies[index] = {
            ...movies[index],
            ...updateReq
        }
        await writeFile('movies.json', movies)
    })

program.parse()
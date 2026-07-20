import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
  
    @Get()
    getUsers() {
        return this.usersService.getUsers()
    }

    @Post()
    // req.body
    createUser(@Body() createUserDto: CreateUserDto){
        if(!createUserDto.age || !createUserDto.name){
            // return res.status(400).json({message: "name and age is requred"})
            throw new HttpException('Name and age is required', HttpStatus.BAD_REQUEST)
        }
        return this.usersService.createUser({name: createUserDto.name, age: createUserDto.age})
    }


    @Get(':id')
    getById(@Param('id') id: string){
        return this.usersService.getUserById(Number(id))
    }


    @Delete(':id')
    deleteById(@Param('id') id: string){
        return  this.usersService.deteleUserById(Number(id))
    }

    @Patch(':id')
    updateById(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ){
        return this.usersService.updateUserById(Number(id), updateUserDto)
    }
}

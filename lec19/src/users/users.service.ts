import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'giorgi', age: 22 },
        { id: 2, name: 'Nika', age: 24 },
    ];

    getUsers(): IUser[] {
        return this.users
    }


    createUser({age, name}: CreateUserDto): IUser{
        const lastId = this.users[this.users.length - 1]?.id || 0

        const newUser = {
            name,
            age,
            id: lastId+1
        }

        this.users.push(newUser)
        return newUser
    }

    getUserById(userId: number): IUser{
        const user = this.users.find(u => u.id === userId)
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return user
    }


    deteleUserById(userId: number): IUser{
        const index = this.users.findIndex(u => u.id === userId)
        if(index === -1){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const [deletedUser] = this.users.splice(index, 1)
        return deletedUser
    }


    updateUserById(userId: number, updateUserDto: UpdateUserDto): IUser{
        const index = this.users.findIndex(u => u.id === userId)
        if(index === -1){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const updateReq = {}
        if(updateUserDto.age){
            updateReq['age'] = updateUserDto.age
        }
        if(updateUserDto.name){
            updateReq['name'] = updateUserDto.name
        }

        this.users[index] = {
            ...this.users[index],
            ...updateReq
        }

        return this.users[index]
    }
}

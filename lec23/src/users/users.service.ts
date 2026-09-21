import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schema/user.schema";
import { CreateUserInput } from "./dto/create-user.input";
import { Post } from "src/posts/schema/post.schema";


@Injectable()
export class UsersService{
    constructor(
        @InjectModel('users') private usersModel: Model<User>,
        @InjectModel('posts') private postsModel: Model<Post>,
    ){}


    getAll(){
        return this.usersModel.find().populate({path: 'posts', select: '-author'})
    }

    async createUser({email,fullName}: CreateUserInput){
        const existUser = await this.usersModel.findOne({email})
        if(existUser) throw new BadRequestException('user already exists')
        
        const newUser = await this.usersModel.create({email, fullName})
        return newUser
    }

    async removeUser(userId: string){
        const existUser = await this.usersModel.findById(userId)
        if(!existUser) throw new NotFoundException('user not found')

        await this.usersModel.findByIdAndDelete(userId)
        await this.postsModel.deleteMany({author: new Types.ObjectId(userId)})

        return existUser
    }

}
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts') private postsModel: Model<Post>,
    @InjectModel('users') private usersModel: Model<User>
  ){}

  async create({desc,title}: CreatePostInput, userId) {
    const user = await this.usersModel.findById(userId)
    if(!user) throw new NotFoundException('User not found')
    
    const newPost = await this.postsModel.create({
      title,
      desc,
      author: userId
    })
    await this.usersModel.findByIdAndUpdate(userId, {
      $push: {posts: newPost._id}
    })

    return newPost
  }

  findAll() {
    return this.postsModel.find().populate({path: 'author', select: 'fullName email'})
  }

  async findOne(id: string) {
    const post = await this.postsModel.findById(id)
    if(!post) throw new NotFoundException('post not found')

    return post
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    const post = await this.postsModel.findById(id)
    if(!post) throw new NotFoundException('post not found')
    await this.postsModel.findByIdAndDelete(id)
    await this.usersModel.findByIdAndUpdate(post.author, {
      $pull: {posts: post._id}
    })

    return post
  }
}

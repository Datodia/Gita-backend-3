import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ){}

  async create(createPostDto: CreatePostDto) {
    const user = await this.userRepo.findOneBy({id: createPostDto.author})
    if(!user){
      throw new BadRequestException('User not found')
    }
    const newPost = await this.postRepo.create({
      title: createPostDto.title,
      desc: createPostDto.desc,
      author: user
    })

    return await this.postRepo.save(newPost)
  }

  findAll() {
    return this.postRepo.find({relations: {author: true}})
  }

  async findOne(id: string) {
    const post = await this.postRepo.findOne({where: {id}, relations: {author: true}})
    if(!post){
      throw new NotFoundException('post not found')
    }
    return post
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOne({where: {id}, relations: {author: true}})
    if(!post){
      throw new NotFoundException('post not found')
    }

    const {author, ...rest} = updatePostDto

    if(author){
      const user = await this.userRepo.findOneBy({id: author})
      if(!user){
        throw new BadRequestException('User not found')
      }
      post.author = user
    }

    Object.assign(post, rest)

    return await this.postRepo.save(post)
  }

  remove(id: string) {
    return this.postRepo.delete(id)
  }
}

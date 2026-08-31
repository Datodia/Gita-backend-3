import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepo.findOneBy({email: createUserDto.email})
    if(existUser){
      throw new BadRequestException('Email in use')
    }

    const newUser = await this.userRepo.create(createUserDto)
    return await this.userRepo.save(newUser)
  }

  findAll() {
    const skip = 0
    return this.userRepo.find({
      relations: {posts: true}, 
      skip,
      take: 30,
    });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({where: {id}, relations: {posts: true}})
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({id})
    if(!user){
      throw new NotFoundException('User not found')
    }
    await this.userRepo.update(id, updateUserDto)
    return {...user, ...updateUserDto}
  }

  async remove(id: string) {
    const user = await this.userRepo.findOneBy({id})
    if(!user){
      throw new NotFoundException('User not found')
    }
    await this.userRepo.delete({id})
    return user
  }
}

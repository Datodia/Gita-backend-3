import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { Expense } from 'src/expenses/schema/expense.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('expense') private expenseModel: Model<Expense>,
  ){}

  async create({age, email, fullName}: CreateUserDto) {
    const existUser = await this.userModel.findOne({email})
    if(existUser){
      throw new BadRequestException('User alredy exists')
    }

    const newUser = await this.userModel.create({
      age,
      email,
      fullName
    })
    return newUser
  }

  findAll() {
    return this.userModel.find()
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate({path: 'expenses', select: 'amount category -_id'})
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const udpatedUser = await this.userModel.findByIdAndUpdate(
      id, 
      {
        ...updateUserDto,
        $inc: {__v:1}
      },
      {new: true}
    )

    if(!udpatedUser){
      throw new NotFoundException('user not found')
    }
    return udpatedUser
  }

  async addExpenseToUser(userId: mongoose.Schema.Types.ObjectId, expenseId:string){
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {expenses: expenseId}
      }
    )

    return updatedUser
  }

  async remove(id: any) {
    const deletedUser = await this.userModel.findByIdAndDelete(id)
    if(!deletedUser){
      throw new NotFoundException('user not found')
    }

    await this.expenseModel.deleteMany({owner: id})
    return deletedUser
  }
}

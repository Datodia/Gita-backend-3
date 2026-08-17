import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IExpense } from './interface/expense.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from './dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {

    constructor(
        @InjectModel('expense') private expenseModel: Model<Expense>,
        private userService: UsersService
    ){}

    getAll({page, take}: PaginationDto){
        return this.expenseModel.find()
    }


    getById(id: string){
        return this.expenseModel.findById(id).populate({path: 'owner', select: 'fullName age -_id'})
    }

    async create({category, amount, owner}: CreateExpenseDto & {owner: mongoose.Schema.Types.ObjectId}){
       const newExpense = await this.expenseModel.create({
        amount,
        category,
        owner
       })

       await this.userService.addExpenseToUser(owner, newExpense._id.toString())

        return newExpense
    }
}

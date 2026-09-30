import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from './dto/pagination.dto';
import mongoose, { Model } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { UsersService } from "../users/users.service";
export declare class ExpensesService {
    private expenseModel;
    private userService;
    constructor(expenseModel: Model<Expense>, userService: UsersService);
    getAll({ page, take }: PaginationDto, userId: any): mongoose.Query<(mongoose.Document<unknown, {}, Expense, {}, mongoose.DefaultSchemaOptions> & Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], mongoose.Document<unknown, {}, Expense, {}, mongoose.DefaultSchemaOptions> & Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, Expense, "find", {}>;
    getById(id: string): mongoose.Query<(mongoose.Document<unknown, {}, Expense, {}, mongoose.DefaultSchemaOptions> & Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null, mongoose.Document<unknown, {}, Expense, {}, mongoose.DefaultSchemaOptions> & Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, Expense, "findOne", {}>;
    create({ category, amount, owner }: CreateExpenseDto & {
        owner: mongoose.Schema.Types.ObjectId;
    }): Promise<mongoose.Document<unknown, {}, Expense, {}, mongoose.DefaultSchemaOptions> & Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

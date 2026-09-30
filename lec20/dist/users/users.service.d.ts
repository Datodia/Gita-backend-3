import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { Expense } from "../expenses/schema/expense.schema";
export declare class UsersService {
    private userModel;
    private expenseModel;
    constructor(userModel: Model<User>, expenseModel: Model<Expense>);
    create({ age, email, fullName, address }: CreateUserDto): Promise<mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): mongoose.Query<(mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, User, "find", {}>;
    findOne(id: string): Promise<(mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    addExpenseToUser(userId: mongoose.Schema.Types.ObjectId, expenseId: string): Promise<(mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: any): Promise<mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

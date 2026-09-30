import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { PaginationDto } from './dto/pagination.dto';
import { IsValidObjectId } from "../common/dto/is-valid-object-id.dto";
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    getAll(paginationDto: PaginationDto, userId: any): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expense, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/expense.schema").Expense & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expense, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/expense.schema").Expense & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/expense.schema").Expense, "find", {}>;
    getById({ id }: IsValidObjectId): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expense, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/expense.schema").Expense & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expense, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/expense.schema").Expense & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/expense.schema").Expense, "findOne", {}>;
    create({ amount, category }: CreateExpenseDto, userId: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expense, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/expense.schema").Expense & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

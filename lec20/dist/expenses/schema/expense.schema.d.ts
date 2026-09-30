import mongoose from "mongoose";
export declare class Expense {
    category: string;
    amount: number;
    owner: mongoose.Schema.Types.ObjectId;
}
export declare const expenseSchema: mongoose.Schema<Expense, mongoose.Model<Expense, any, any, any, any, any, Expense>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Expense, mongoose.Document<unknown, {}, Expense, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Expense & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    category?: mongoose.SchemaDefinitionProperty<string, Expense, mongoose.Document<unknown, {}, Expense, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amount?: mongoose.SchemaDefinitionProperty<number, Expense, mongoose.Document<unknown, {}, Expense, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    owner?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId, Expense, mongoose.Document<unknown, {}, Expense, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Expense & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Expense>;

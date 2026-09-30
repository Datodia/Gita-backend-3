import mongoose from "mongoose";
declare class Address {
    street: string;
    city: string;
}
export declare class User {
    fullName: string;
    email: string;
    password?: string;
    age?: number;
    expenses: mongoose.Schema.Types.ObjectId[];
    address: Address;
    isVerified: boolean;
    OTPCode?: string;
    OTPCodeExpirationDate?: number;
    profilePic?: string;
}
export declare const userSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any, any, User>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    fullName?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: mongoose.SchemaDefinitionProperty<string, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    password?: mongoose.SchemaDefinitionProperty<string | undefined, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    age?: mongoose.SchemaDefinitionProperty<number | undefined, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    expenses?: mongoose.SchemaDefinitionProperty<mongoose.Schema.Types.ObjectId[], User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: mongoose.SchemaDefinitionProperty<Address, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    OTPCode?: mongoose.SchemaDefinitionProperty<string | undefined, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    OTPCodeExpirationDate?: mongoose.SchemaDefinitionProperty<number | undefined, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    profilePic?: mongoose.SchemaDefinitionProperty<string | undefined, User, mongoose.Document<unknown, {}, User, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, User>;
export {};

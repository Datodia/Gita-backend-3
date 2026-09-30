import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { IsValidObjectId } from "../common/dto/is-valid-object-id.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<mongoose.Document<unknown, {}, import("./schema/user.schema").User, {}, mongoose.DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): mongoose.Query<(mongoose.Document<unknown, {}, import("./schema/user.schema").User, {}, mongoose.DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[], mongoose.Document<unknown, {}, import("./schema/user.schema").User, {}, mongoose.DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("./schema/user.schema").User, "find", {}>;
    findOne({ id }: IsValidObjectId): Promise<(mongoose.Document<unknown, {}, import("./schema/user.schema").User, {}, mongoose.DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update({ id }: IsValidObjectId, updateUserDto: UpdateUserDto): Promise<mongoose.Document<unknown, {}, import("./schema/user.schema").User, {}, mongoose.DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove({ id }: IsValidObjectId, userId: any): Promise<mongoose.Document<unknown, {}, import("./schema/user.schema").User, {}, mongoose.DefaultSchemaOptions> & import("./schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}

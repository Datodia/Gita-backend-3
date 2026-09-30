import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { QueryParamsDto } from './dto/query-params.dto';
import { AwsS3Service } from "../aws-s3/aws-s3.service";
export declare class ProductsService {
    private productModel;
    private awsS3Service;
    constructor(productModel: Model<Product>, awsS3Service: AwsS3Service);
    onModuleInit(): Promise<void>;
    uploadImage(file: Express.Multer.File): Promise<any>;
    uploadMany(files: Express.Multer.File[]): Promise<string[]>;
    getFile(fileId: string): Promise<string | undefined>;
    create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll({ page, take, priceFrom, priceTo, name, isStock, sort, includeName }: QueryParamsDto): Promise<(import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Product, {}, import("mongoose").DefaultSchemaOptions> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}

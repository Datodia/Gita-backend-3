import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from './dto/query-params.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(queryParams: QueryParamsDto): Promise<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getFile(fileId: string): Promise<string | undefined>;
    uploadFile(file: Express.Multer.File): Promise<any>;
    uploadMany(files: Array<Express.Multer.File>): Promise<string[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/product.schema").Product, {}, import("mongoose").DefaultSchemaOptions> & import("./schema/product.schema").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}

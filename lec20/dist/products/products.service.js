"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const faker_1 = require("@faker-js/faker");
const aws_s3_service_1 = require("../aws-s3/aws-s3.service");
const crypto_1 = require("crypto");
const path_1 = __importDefault(require("path"));
let ProductsService = class ProductsService {
    productModel;
    awsS3Service;
    constructor(productModel, awsS3Service) {
        this.productModel = productModel;
        this.awsS3Service = awsS3Service;
    }
    async onModuleInit() {
        const productCount = await this.productModel.countDocuments();
        if (productCount === 0) {
            const dataToInsert = [];
            console.log('seeding starting');
            for (let i = 0; i < 300_000; i++) {
                dataToInsert.push({
                    name: faker_1.faker.commerce.product(),
                    price: Number(faker_1.faker.commerce.price({ min: 50, max: 450 })),
                    photoUrl: faker_1.faker.image.avatar(),
                    stock: faker_1.faker.number.int({ min: 1, max: 100 }),
                    rating: faker_1.faker.number.int({ min: 1, max: 10 })
                });
            }
            await this.productModel.insertMany(dataToInsert);
            console.log('Seeding done');
        }
    }
    async uploadImage(file) {
        const ext = path_1.default.extname(file.originalname);
        const fileId = `images/${(0, crypto_1.randomUUID)()}${ext}`;
        return await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype);
    }
    async uploadMany(files) {
        const uploadedImage = [];
        for (let file of files) {
            const fileId = await this.uploadImage(file);
            uploadedImage.push(fileId);
        }
        return uploadedImage;
    }
    getFile(fileId) {
        return this.awsS3Service.getFile(fileId);
    }
    async create(createProductDto, file) {
        const ext = path_1.default.extname(file.originalname);
        const fileId = `images/${(0, crypto_1.randomUUID)()}${ext}`;
        await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype);
        return this.productModel.create({ ...createProductDto, photoUrl: fileId });
    }
    async findAll({ page = 1, take = 30, priceFrom, priceTo, name, isStock, sort, includeName }) {
        const filter = {};
        const sortQuery = {};
        const projection = {};
        if (includeName && includeName === 1) {
            projection['name'] = 1;
        }
        if (includeName === 0) {
            projection['name'] = 0;
        }
        if (priceFrom) {
            filter['price'] = { ...filter.price, $gte: priceFrom };
        }
        if (priceTo) {
            filter['price'] = { ...filter.price, $lte: priceTo };
        }
        if (name) {
            filter['name'] = { '$regex': name, '$options': 'i' };
        }
        if (isStock && isStock === 1) {
            filter['stock'] = { $ne: 0 };
        }
        if (isStock === 0) {
            filter['stock'] = 0;
        }
        if (sort && sort === 'price') {
            sortQuery['price'] = 1;
        }
        if (sort && sort === '-price') {
            sortQuery['price'] = -1;
        }
        if (sort && sort === '-date') {
            sortQuery['_id'] = -1;
        }
        if (sort && sort === 'date') {
            sortQuery['_id'] = 1;
        }
        const resp = await this.productModel
            .find(filter, projection)
            .sort(sortQuery)
            .skip((page - 1) * take)
            .limit(take);
        return resp;
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Wrong Id provided');
        }
        const product = await this.productModel.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    async remove(id) {
        const product = await this.productModel.findById(id);
        if (!product)
            throw new common_1.NotFoundException('prodict not found');
        await this.awsS3Service.deleteFile(product.photoUrl);
        return await this.productModel.findByIdAndDelete(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('product')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        aws_s3_service_1.AwsS3Service])
], ProductsService);
//# sourceMappingURL=products.service.js.map
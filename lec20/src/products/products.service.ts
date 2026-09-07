import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { faker } from '@faker-js/faker';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { QueryParamsDto } from './dto/query-params.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { randomUUID } from 'crypto';
import path from 'path';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<Product>,
    private awsS3Service: AwsS3Service
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async onModuleInit(){
    const productCount = await this.productModel.countDocuments()

    // await this.productModel.updateMany(
    //   {price: 450}, 
    //   {
    //     $set: {
    //       price: 550
    //     }
    //   }
    // )


    // await this.productModel.updateMany(
    //   {},
    //   {
    //     $set: {
    //       desc: faker.commerce.productDescription(),
    //     },
    //     '$inc': {
    //       __v: 1
    //     }
    //   }
    // )


    if(productCount === 0){
      const dataToInsert: any[] = []
      console.log('seeding starting')
      for(let i = 0; i < 300_000; i++){
        dataToInsert.push({
          name: faker.commerce.product(),
          price: Number(faker.commerce.price({min: 50, max: 450})),
          photoUrl: faker.image.avatar(),
          stock: faker.number.int({min: 1, max: 100}),
          rating: faker.number.int({min: 1, max: 10})
        })
      }

      await this.productModel.insertMany(dataToInsert)
      console.log('Seeding done')
    }
  }

  // onModuleDestroy(){
  //   console.log('module destroy')
  // }

  async uploadImage(file: Express.Multer.File){
    const ext = path.extname(file.originalname)
    const fileId = `images/${randomUUID()}${ext}`

    return await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype)
  }

  async uploadMany(files: Express.Multer.File[]){
    const uploadedImage:string[] = []
    for(let file of files){
      const fileId = await this.uploadImage(file)
      uploadedImage.push(fileId)
    }
    return uploadedImage
  }

  getFile(fileId: string){
    return this.awsS3Service.getFile(fileId)
  }

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const ext = path.extname(file.originalname)
    const fileId = `images/${randomUUID()}${ext}`

    await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype)

    return this.productModel.create({...createProductDto, photoUrl: fileId});
  }

  async findAll({page = 1, take = 30, priceFrom, priceTo,name, isStock, sort, includeName}:QueryParamsDto) {
    // const val = await this.cacheManager.get('products');
    // if(!val){
    //   const resp = await this.productModel.find({stock: 50})
    //   await this.cacheManager.set('products', resp, 5 * 60 * 1000)
    //   return resp
    // }
    // return val

    const filter: any = {}
    const sortQuery: any = {}
    const projection: any = {}

    if(includeName && includeName === 1){
      projection['name'] = 1
    }
    if(includeName === 0){
      projection['name'] = 0
    }


    if(priceFrom){
      filter['price'] = {...filter.price, $gte: priceFrom}
    }

    if(priceTo){
      filter['price'] = {...filter.price, $lte: priceTo}
    }

    if(name){
      filter['name'] = {'$regex': name, '$options': 'i'}
    }

    if(isStock && isStock === 1){
      filter['stock'] = {$ne: 0}
    }

    if(isStock === 0){
      filter['stock'] = 0
    }

    if(sort && sort === 'price'){
      sortQuery['price'] = 1
    }
    if(sort && sort === '-price'){
      sortQuery['price'] = -1
    }

    if(sort && sort === '-date'){
      sortQuery['_id'] = -1
    }

    if(sort && sort === 'date'){
      sortQuery['_id'] = 1
    }


    // const resp = await this.productModel
    //                           .find(filter, projection)
    //                           .sort(sortQuery)
    //                           .skip((page - 1) * take)
    //                           .limit(take)

    const resp = await this.productModel.aggregate([
      // {$match: {price: {'$gte': 100}}},
      {$group: {_id: '$name', 
        totalProducts: {
        $sum: 1
      },

      averagePrice: {
        $avg: "$price"
      },

        totalStock: {
          $sum: "$stock"
        },
        cheapest: {
          $min: "$price"
        },

        mostExpensive: {
          $max: "$price"
        }
      }},
      {$sort: {averagePrice: 1}},
      {$limit: 50},
    ])

    return resp
  }


  async findOne(id: string) {
    if(!isValidObjectId(id)){
      throw new BadRequestException('Wrong Id provided')
    }

    const product = await this.productModel.findById(id)
    if(!product){
      throw new NotFoundException('Product not found')
    }

    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.productModel.findById(id)
    if(!product) throw new NotFoundException('prodict not found')

    await this.awsS3Service.deleteFile(product.photoUrl)
    return await this.productModel.findByIdAndDelete(id)
  }
}

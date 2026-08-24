import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { faker } from '@faker-js/faker';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async onModuleInit(){
    const productCount = await this.productModel.countDocuments()
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

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    const val = await this.cacheManager.get('products');
    if(!val){
      const resp = await this.productModel.find({stock: 50})
      await this.cacheManager.set('products', resp, 5 * 60 * 1000)
      return resp
    }
    return val
  }


  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'product', schema: productSchema}
    ]),
    AwsS3Module
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

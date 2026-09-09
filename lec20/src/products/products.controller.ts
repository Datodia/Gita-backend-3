import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {ApiQuery, ApiResponse} from '@nestjs/swagger'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  @ApiResponse({status: 200, example: [{
    "_id": "6a8c6a6183192d78e0733df1",
    "role": "user",
    "name": "Gloves",
    "price": 422.25,
    "photoUrl": "https://avatars.githubusercontent.com/u/81115190",
    "stock": 90,
    "rating": 8,
    "__v": 1,
    "desc": "Discover the turtle-like agility of our Bike, perfect for juvenile users"
  }]})
  @ApiQuery({name: 'page', example: 1, type: Number, required: false, default: 1})
  @ApiQuery({name: 'take', example: 30, type: Number, required: false, default: 30})
  @ApiQuery({name: 'priceFrom', type: Number, required: false })
  @ApiQuery({name: 'priceTo', type: Number, required: false})
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.productsService.findAll(queryParams);
  }

  @Post('get-file')
  getFile(@Body('fileId') fileId: string) {
    return this.productsService.getFile(fileId);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.productsService.uploadImage(file);
  }

  @Post('upload-many')
  @UseInterceptors(FilesInterceptor('images'))
  uploadMany(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);

    return this.productsService.uploadMany(files)
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

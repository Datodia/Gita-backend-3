import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Products Service', () => {
  let productsService: ProductsService;

  const productModelMock = {
    countDocuments: jest.fn(),
    insertMany: jest.fn(),
    find: jest.fn(),
    aggregate: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const productMock = {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    name: 'Test product',
    price: 20,
    photoUrl: 'https://example.com',
    stock: 10,
    rating: 4.5,
    role: 'view',
    desc: 'random Desc',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getModelToken('product'), useValue: productModelMock },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should not seed when products already exist', async () => {
      jest.spyOn(productModelMock, 'countDocuments').mockResolvedValue(5);

      await productsService.onModuleInit();

      expect(productModelMock.insertMany).not.toHaveBeenCalled();
    });

    it('should seed products when collection empty', async () => {
      jest.spyOn(productModelMock, 'countDocuments').mockResolvedValue(0);
      jest.spyOn(productModelMock, 'insertMany').mockResolvedValue(undefined);

      await productsService.onModuleInit();

      expect(productModelMock.insertMany).toHaveBeenCalledTimes(1);
      const inserted = productModelMock.insertMany.mock.calls[0][0];
      expect(inserted).toHaveLength(300_000);
    }, 30000);
  });

  describe('create', () => {
    it('should call productModel.create with dto and return created product', async () => {
      const dto: any = { name: 'New product' };
      jest.spyOn(productModelMock, 'create').mockResolvedValue(productMock);

      const result = await productsService.create(dto);

      expect(productModelMock.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(productMock);
    });
  });

  describe('findAll', () => {
    it('should call aggregate and return result with default params', async () => {
      jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([productMock]);

      const result = await productsService.findAll({} as any);

      expect(productModelMock.aggregate).toHaveBeenCalledTimes(1);
      expect(result).toEqual([productMock]);
    });

    it('should build filter with priceFrom and priceTo', async () => {
      jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([]);

      await productsService.findAll({ priceFrom: 10, priceTo: 100 } as any);

      const pipeline = productModelMock.aggregate.mock.calls[0][0];
      expect(pipeline).toEqual(expect.any(Array));
    });

    it('should handle name filter', async () => {
      jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([]);

      await productsService.findAll({ name: 'phone' } as any);

      expect(productModelMock.aggregate).toHaveBeenCalled();
    });

    it('should handle isStock = 1', async () => {
      jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([]);

      await productsService.findAll({ isStock: 1 } as any);

      expect(productModelMock.aggregate).toHaveBeenCalled();
    });

    it('should handle isStock = 0', async () => {
      jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([]);

      await productsService.findAll({ isStock: 0 } as any);

      expect(productModelMock.aggregate).toHaveBeenCalled();
    });

    it.each(['price', '-price', 'date', '-date'])(
      'should handle sort = %s',
      async (sort) => {
        jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([]);

        await productsService.findAll({ sort } as any);

        expect(productModelMock.aggregate).toHaveBeenCalled();
      },
    );

    it.each([1, 0])('should handle includeName = %i', async (includeName) => {
      jest.spyOn(productModelMock, 'aggregate').mockResolvedValue([]);

      await productsService.findAll({ includeName } as any);

      expect(productModelMock.aggregate).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should throw BadRequestException when wrong id provided', async () => {
      const invalidId = 'invalid-id';
      expect(() => productsService.findOne(invalidId)).rejects.toThrow(
        new BadRequestException('Wrong Id provided'),
      );
    });

    it('should throw NotFoundException when product not found', async () => {
      jest.spyOn(productModelMock, 'findById').mockResolvedValue(null);
      expect(async () => {
        await productsService.findOne('aaaaaaaaaaaaaaaaaaaaaaaa');
      }).rejects.toThrow(NotFoundException);
    });

    it('should return real product when correct id passed', async () => {
      jest.spyOn(productModelMock, 'findById').mockResolvedValue(productMock);
      const post = await productsService.findOne('aaaaaaaaaaaaaaaaaaaaaaaa');
      expect(post).toEqual(productMock);
    });
  });

  describe('update', () => {
    it('should return update action message', () => {
      const result = productsService.update(1, {} as any);
      expect(result).toBe('This action updates a #1 product');
    });
  });

  describe('remove', () => {
    it('should return remove action message', () => {
      const result = productsService.remove(1);
      expect(result).toBe('This action removes a #1 product');
    });
  });
});

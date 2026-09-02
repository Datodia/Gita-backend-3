import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ExpensesService } from './expenses.service';
import { UsersService } from 'src/users/users.service';

describe('Expenses Service', () => {
  let expensesService: ExpensesService;

  const expenseModelMock = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  const usersServiceMock = {
    addExpenseToUser: jest.fn(),
  };

  const expenseMock = {
    _id: 'bbbbbbbbbbbbbbbbbbbbbbbb',
    amount: 100,
    category: 'food',
    owner: 'aaaaaaaaaaaaaaaaaaaaaaaa',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        { provide: getModelToken('expense'), useValue: expenseModelMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compile();

    expensesService = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(expensesService).toBeDefined();
  });

  describe('getAll', () => {
    it('should find expenses filtered by owner and populate owner', async () => {
      const populateMock = jest.fn().mockResolvedValue([expenseMock]);
      jest.spyOn(expenseModelMock, 'find').mockReturnValue({ populate: populateMock });

      const result = await expensesService.getAll({ page: 1, take: 30 }, 'aaaaaaaaaaaaaaaaaaaaaaaa');

      expect(expenseModelMock.find).toHaveBeenCalledWith({ owner: 'aaaaaaaaaaaaaaaaaaaaaaaa' });
      expect(populateMock).toHaveBeenCalledWith({
        path: 'owner',
        select: 'fullName age email -_id',
      });
      expect(result).toEqual([expenseMock]);
    });
  });

  describe('getById', () => {
    it('should find expense by id and populate owner', async () => {
      const populateMock = jest.fn().mockResolvedValue(expenseMock);
      jest.spyOn(expenseModelMock, 'findById').mockReturnValue({ populate: populateMock });

      const result = await expensesService.getById(expenseMock._id);

      expect(expenseModelMock.findById).toHaveBeenCalledWith(expenseMock._id);
      expect(populateMock).toHaveBeenCalledWith({
        path: 'owner',
        select: 'fullName age -_id',
      });
      expect(result).toEqual(expenseMock);
    });
  });

  describe('create', () => {
    it('should create expense and add it to the owner', async () => {
      jest.spyOn(expenseModelMock, 'create').mockResolvedValue(expenseMock);
      jest.spyOn(usersServiceMock, 'addExpenseToUser').mockResolvedValue(undefined);

      const dto = {
        amount: 100,
        category: 'food',
        owner: expenseMock.owner as any,
      };

      const result = await expensesService.create(dto);

      expect(expenseModelMock.create).toHaveBeenCalledWith({
        amount: dto.amount,
        category: dto.category,
        owner: dto.owner,
      });
      expect(usersServiceMock.addExpenseToUser).toHaveBeenCalledWith(
        dto.owner,
        expenseMock._id.toString(),
      );
      expect(result).toEqual(expenseMock);
    });
  });
});

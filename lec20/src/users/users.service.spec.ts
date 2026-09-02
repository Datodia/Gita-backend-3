import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('Users Service', () => {
  let usersService: UsersService;

  const userModelMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  const expenseModelMock = {
    deleteMany: jest.fn(),
  };

  const userMock = {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    fullName: 'test user',
    email: 'test@test.com',
    age: 20,
    address: { street: 'main st', city: 'tbilisi' },
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('user'), useValue: userModelMock },
        { provide: getModelToken('expense'), useValue: expenseModelMock },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    const createUserDto = {
      fullName: 'test user',
      email: 'test@test.com',
      age: 20,
    };

    it('should throw BadRequestException when user already exists', async () => {
      jest.spyOn(userModelMock, 'findOne').mockResolvedValue(userMock);

      await expect(usersService.create(createUserDto as any)).rejects.toThrow(
        new BadRequestException('User alredy exists'),
      );
      expect(userModelMock.create).not.toHaveBeenCalled();
    });

    it('should create and return a new user', async () => {
      jest.spyOn(userModelMock, 'findOne').mockResolvedValue(null);
      jest.spyOn(userModelMock, 'create').mockResolvedValue(userMock);

      const result = await usersService.create(createUserDto as any);

      expect(userModelMock.create).toHaveBeenCalledWith({
        age: createUserDto.age,
        email: createUserDto.email,
        fullName: createUserDto.fullName,
        password: 'test123',
        address: undefined,
      });
      expect(result).toEqual(userMock);
    });
  });

  describe('findAll', () => {
    it('should return all users', () => {
      jest.spyOn(userModelMock, 'find').mockReturnValue([userMock]);

      const result = usersService.findAll();

      expect(userModelMock.find).toHaveBeenCalled();
      expect(result).toEqual([userMock]);
    });
  });

  describe('findOne', () => {
    it('should return user by id with populated expenses', async () => {
      const populateMock = jest.fn().mockResolvedValue(userMock);
      jest.spyOn(userModelMock, 'findById').mockReturnValue({ populate: populateMock });

      const result = await usersService.findOne(userMock._id);

      expect(userModelMock.findById).toHaveBeenCalledWith(userMock._id);
      expect(populateMock).toHaveBeenCalledWith({
        path: 'expenses',
        select: 'amount category -_id',
      });
      expect(result).toEqual(userMock);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException when user does not exist', async () => {
      jest.spyOn(userModelMock, 'findById').mockResolvedValue(null);

      await expect(usersService.update(userMock._id, {} as any)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });

    it('should update provided fields and save', async () => {
      const existingUser = {
        ...userMock,
        address: { street: 'old st', city: 'old city' },
        save: jest.fn().mockResolvedValue(userMock),
      };
      jest.spyOn(userModelMock, 'findById').mockResolvedValue(existingUser);

      const updateDto = {
        fullName: 'updated name',
        email: 'updated@test.com',
        age: 25,
        address: { city: 'new city' },
      };

      const result = await usersService.update(userMock._id, updateDto as any);

      expect(existingUser.fullName).toBe('updated name');
      expect(existingUser.email).toBe('updated@test.com');
      expect(existingUser.age).toBe(25);
      expect(existingUser.address).toEqual({ street: 'old st', city: 'new city' });
      expect(existingUser.save).toHaveBeenCalled();
      expect(result).toEqual(userMock);
    });

    it('should not touch fields that are not provided', async () => {
      const existingUser = {
        ...userMock,
        fullName: 'original name',
        save: jest.fn().mockResolvedValue(userMock),
      };
      jest.spyOn(userModelMock, 'findById').mockResolvedValue(existingUser);

      await usersService.update(userMock._id, {} as any);

      expect(existingUser.fullName).toBe('original name');
      expect(existingUser.save).toHaveBeenCalled();
    });
  });

  describe('addExpenseToUser', () => {
    it('should push expense id to user expenses', async () => {
      jest.spyOn(userModelMock, 'findByIdAndUpdate').mockResolvedValue(userMock);

      const result = await usersService.addExpenseToUser(
        userMock._id as any,
        'expense-id',
      );

      expect(userModelMock.findByIdAndUpdate).toHaveBeenCalledWith(userMock._id, {
        $push: { expenses: 'expense-id' },
      });
      expect(result).toEqual(userMock);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(userModelMock, 'findByIdAndDelete').mockResolvedValue(null);

      await expect(usersService.remove(userMock._id)).rejects.toThrow(
        new NotFoundException('user not found'),
      );
      expect(expenseModelMock.deleteMany).not.toHaveBeenCalled();
    });

    it('should delete user and their expenses', async () => {
      jest.spyOn(userModelMock, 'findByIdAndDelete').mockResolvedValue(userMock);
      jest.spyOn(expenseModelMock, 'deleteMany').mockResolvedValue({ deletedCount: 2 });

      const result = await usersService.remove(userMock._id);

      expect(expenseModelMock.deleteMany).toHaveBeenCalledWith({ owner: userMock._id });
      expect(result).toEqual(userMock);
    });
  });
});

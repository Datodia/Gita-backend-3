import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('Auth Service', () => {
  let authService: AuthService;

  const userModelMock = {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(),
  };

  const userMock = {
    _id: 'aaaaaaaaaaaaaaaaaaaaaaaa',
    fullName: 'test user',
    email: 'test@test.com',
    age: 20,
    password: 'hashed-password',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken('user'), useValue: userModelMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    const signUpDto = {
      fullName: 'test user',
      email: 'test@test.com',
      age: 20,
      password: 'password123',
    };

    it('should throw BadRequestException when user already exists', async () => {
      jest.spyOn(userModelMock, 'findOne').mockResolvedValue(userMock);

      await expect(authService.signUp(signUpDto)).rejects.toThrow(
        new BadRequestException('User already exists'),
      );
      expect(userModelMock.create).not.toHaveBeenCalled();
    });

    it('should hash password and create user', async () => {
      jest.spyOn(userModelMock, 'findOne').mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      jest.spyOn(userModelMock, 'create').mockResolvedValue(userMock);

      const result = await authService.signUp(signUpDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(signUpDto.password, 10);
      expect(userModelMock.create).toHaveBeenCalledWith({
        email: signUpDto.email,
        age: signUpDto.age,
        fullName: signUpDto.fullName,
        password: 'hashed-password',
      });
      expect(result).toEqual({
        success: true,
        message: 'user created successfully',
      });
    });
  });

  describe('signIn', () => {
    const signInDto = { email: 'test@test.com', password: 'password123' };

    it('should throw BadRequestException when user not found', async () => {
      jest.spyOn(userModelMock, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        new BadRequestException('Email or password is invalid'),
      );
    });

    it('should throw BadRequestException when password does not match', async () => {
      jest.spyOn(userModelMock, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(userMock),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        new BadRequestException('Email or password is invalid'),
      );
    });

    it('should return token when credentials are valid', async () => {
      jest.spyOn(userModelMock, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(userMock),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtServiceMock, 'sign').mockResolvedValue('signed-token');

      const result = await authService.signIn(signInDto);

      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        { userId: userMock._id },
        { expiresIn: '1h' },
      );
      expect(result).toEqual({ token: 'signed-token' });
    });
  });

  describe('getCurrentUser', () => {
    it('should return user by id', async () => {
      jest.spyOn(userModelMock, 'findById').mockResolvedValue(userMock);

      const result = await authService.getCurrentUser(userMock._id);

      expect(userModelMock.findById).toHaveBeenCalledWith(userMock._id);
      expect(result).toEqual(userMock);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('App Service', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return english text', () => {
      expect(appService.getHello('en')).toBe('hello world');
    });

    it('should return georgian text', () => {
      expect(appService.getHello('ka')).toBe('გამარჯობა სამყარო');
    });

    it('should throw when lang is not supported', () => {
      expect(() => appService.getHello('fr')).toThrow();
    });
  });
});

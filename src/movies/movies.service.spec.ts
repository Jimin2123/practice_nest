import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// 보통 테스팅은 영어 읽듯이 하면 된다.

// describe : 테스트를 묘사한다는 의미
describe('MoviesService', () => {
  let service: MoviesService;
  // beforeEach : 테스트를 하기 전에 실행한다는 의미
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('shold return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID : 999 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('it delete a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      service.update(1, { year: 2020 });
      const movie = service.getOne(1);
      expect(movie.year).toEqual(2020);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { year: 2020 });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  // it('should be 4', () => {
  //   // 2 + 2가 4와 같기(toEqual)를 기대(expect)하고 있어라는 의미
  //   expect(2 + 2).toEqual(4);
  // });
});

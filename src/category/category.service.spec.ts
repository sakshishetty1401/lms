import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryDTO } from './category.dto';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

const category = [{
  id: 2,
  name: "Fiction",
  books: [{
    bookName: "RichDad Vs PoorDad",
    authorName: "Robert V",
    description: "published in the year 1997",
    cost: 249,
    users: 1
  }]
}]

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: CategoryRepository,
        useFactory: () => ({
          find: jest.fn(),
          save: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn()

        })
      }],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });


  describe("when addCategory()", () => {
    describe("And success", () => {
      it("should return response", async () => {
        let finddSpy = jest.spyOn(categoryRepository, 'save').mockResolvedValue(category);
        let response = await categoryService.addCategory();
        expect(response).toEqual(category);
        expect(finddSpy).toHaveBeenCalled();
      })
    })
    describe("And Failed", () => {
      it("should return error", async () => {
        let finddSpy = jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error('some internal error'));
        await expect(categoryService.addCategory()).rejects.toThrow(HttpException);
        expect(finddSpy).toHaveBeenCalled();
      })
    })
  })


  describe("when allCategory()", () => {
    describe("And success", () => {
      it("should return response", async () => {
        const category = [{
          id: 2,
          name: "Fiction",
          books: [{
            bookName: "RichDad Vs PoorDad",
            authorName: "Robert V",
            description: "published in the year 1997",
            cost: 249,
            users: 1
          }]
        }]
        let findSpy = jest.spyOn(categoryRepository, 'find').mockResolvedValue(category);
        let response = await categoryService.allCategory();
        expect(response).toEqual(category);
        expect(findSpy).toHaveBeenCalled();

      })
    })
    describe("And Failed", () => {
      it("should return error", async () => {
        let findSpy = jest.spyOn(categoryRepository, 'find').mockRejectedValue(new Error('some internal error'));
        await expect(categoryService.allCategory()).rejects.toThrow(HttpException);
        expect(findSpy).toHaveBeenCalled();
      })
    })
  })

});

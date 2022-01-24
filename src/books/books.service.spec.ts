import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksDTO } from './books.dto';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';

const books = {
  id: 3,
  bookName: "RichDad Vs PoorDad",
  authorName: "Robert V",
  description: "published in the year 1997",
  cost: 249,
  status: "Available"
}
describe('BooksService', () => {
  let booksService: BooksService;
  let booksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,{
        provide: BooksRepository,
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

    booksService = module.get<BooksService>(BooksService);
    booksRepository = module.get<BooksRepository>(BooksRepository);
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe("when listOfBooks()", () => {
    describe("And success", () => {
      it("should return response", async () => {
        let findSpy = jest.spyOn(booksRepository, 'find').mockResolvedValue(books);
        let response = await booksService.listOfBooks();
        expect(response).toEqual(books);
        expect(findSpy).toHaveBeenCalled();

      })
    })
    describe("And Failed", () => {
      it("should return error", async () => {
        let findSpy = jest.spyOn(booksRepository, 'find').mockRejectedValue(new Error('some internal error'));
        await expect(booksService.listOfBooks()).rejects.toThrow(HttpException);
        expect(findSpy).toHaveBeenCalled();
      })
    })
  })


  // describe("when orderBooks()", () => {
  //   describe("And success", () => {
  //     it("should return response", async () => {
  //       const books = {
  //         id: 3,
  //         bookName: "RichDad Vs PoorDad",
  //         authorName: "Robert V",
  //         description: "published in the year 1997",
  //         cost: 249,
  //         status: "Available"
  //       }
  //       let orderBooksSpy = jest.spyOn(booksRepository, 'findOne').mockResolvedValue(books);
  //       let response = await booksService.orderBooks(1);
  //       expect(response).toEqual(books);
  //       expect(orderBooksSpy).toHaveBeenCalled();

  //     })
  //   })
  //   describe("And Failed", () => {
  //     it("should return error", async () => {
  //       let orderBooksSpy = jest.spyOn(booksRepository, 'findOne').mockRejectedValue(new Error('some internal error'));
  //       await expect(booksService.orderBooks(1)).rejects.toThrow(HttpException);
  //       expect(orderBooksSpy).toHaveBeenCalled();
  //     })
  //   })
  // })
});

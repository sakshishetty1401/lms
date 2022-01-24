import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksDTO } from './books.dto';
import { BooksService } from './books.service';

const books =[ {
  id: 3,
  bookName: "RichDad Vs PoorDad",
  authorName: "Robert V",
  description: "published in the year 1997",
  cost: 249,
  status: "Available"
}]

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, {
        provide: BooksService,
        useFactory: () => ({
          searchBook: jest.fn(),
          listOfBooks: jest.fn()
         })
      }]
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
  
  describe('when listOfBooks()', () => {
    it('should return response', async () => {
      let listOfBooksSpy = jest.spyOn(booksService, 'listOfBooks').mockResolvedValue(books);
      let response = await booksController.listOfBooks();
      expect(response).toEqual(books)
      expect(listOfBooksSpy).toHaveBeenCalled()
      expect(listOfBooksSpy).toHaveBeenCalledTimes(1);
    })
  })


  // describe('when searchBook()', () => {
  //   it('should return response', async () => {
  //     let listOfBooksSpy = jest.spyOn(booksService, 'searchBook').mockResolvedValue(books);
  //     let response = await booksController.searchBook();
  //     expect(response).toEqual(books)
  //     expect(listOfBooksSpy).toHaveBeenCalled()
  //     expect(listOfBooksSpy).toHaveBeenCalledTimes(1);
  //   })
  // })

});

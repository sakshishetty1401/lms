import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryDTO } from './category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';


const category = [{
  id:2,
  name:"Fiction",
  books:[{
  bookName:"RichDad Vs PoorDad",
  authorName:"Robert V",
  description:"published in the year 1997",
  cost:249,
  users:3
  }]
  }]

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, {
        provide: CategoryService,
        useFactory: () => ({
          addCategory:jest.fn(),
          allCategory: jest.fn()
         })
      }]
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe('When addCategory()', () => { 
    it('should return response', async () => { 
      let addCategorySpy = jest.spyOn(categoryService, 'addCategory').mockResolvedValue(category) 
      let response = await categoryController.addCategory();
       expect(response).toEqual(category) 
       expect(addCategorySpy).toHaveBeenCalled() 
       expect(addCategorySpy).toHaveBeenCalledTimes(1);
       }) 
      })
  

  describe('when allCategory()', () => {
    it('should return response', async () => {
      let allCategorySpy = jest.spyOn(categoryService, 'allCategory').mockResolvedValue(category);
      let response = await categoryController.allCategory();
      expect(response).toEqual(category)
      expect(allCategorySpy).toHaveBeenCalled()
      expect(allCategorySpy).toHaveBeenCalledTimes(1)



    })
  })

});

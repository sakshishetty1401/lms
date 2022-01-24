import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { Role } from './role.enum';
import { UsersController } from './users.controller';
import { UsersDTO } from './users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

const users= {
  userName: "sanya",
  emailId: "sanya@hcl.com",
  password: "sanya",
  phoneNumber: 9542285999
}

describe('UserController', () => {
  // it('should match', () => {
  //   expect(1).toBe(1);
  //   expect('HCL').toBe('HCL')
  //   expect('HCL').not.toBe('HCL TECH')
  //   expect(2).not.toBe(20);

  //   const isOpen = true;
  //   expect(isOpen).toBe(true); //  expect(isOpen).toBeTruthy()
  //   expect(isOpen).not.toBe(false); //expect(isOpen).not.toBeTruthy()

  //   let value = null
  //   expect(value).toBe(null)
  // })

  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    let module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: UsersService,
        useFactory: () => ({
          registerUser: jest.fn(),
          loginUser: jest.fn(),
          listOfUser: jest.fn(),
          myBooks: jest.fn()

        })
      }]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

  });

  it('should be defined', () => {
    expect(UsersController).toBeDefined();
  })

  describe('when listOfUser()', () => {
    it('should return response', async () => {
      let listOfUserSpy = jest.spyOn(usersService, 'listOfUser').mockResolvedValue(users);
      let response = await usersController.listOfUser();
      expect(response).toEqual(users)
      expect(listOfUserSpy).toHaveBeenCalled()
      expect(listOfUserSpy).toHaveBeenCalledTimes(1);



    })
  })


  describe('when myBooks()', () => {
    it('should return response', async () => {
      let users = {
        userName: "sanya",
        emailId: "sanya@hcl.com",
        password: "sanya",
        phoneNumber: 9542285999
      }
      let myBooksSpy = jest.spyOn(usersService, 'myBooks').mockResolvedValue(users);
      let response = await usersController.myBooks(1);
      expect(response).toEqual(users);
      expect(myBooksSpy).toHaveBeenCalled()
      expect(myBooksSpy).toHaveBeenCalledTimes(1);


    })
  })


});

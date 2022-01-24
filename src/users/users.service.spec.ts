import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { userInfo } from 'os';
import { Role } from './role.enum';
import { UsersDTO } from './users.dto';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const users = {
  userName: "sanya",
  emailId: "sanya@hcl.com",
  password: "sanya",
  phoneNumber: 9542285999
}

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: UsersRepository,
        useFactory: () => ({
          find: jest.fn(),
          getMyBooks: jest.fn(),
          save: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findOne: jest.fn(),
          create: jest.fn()

        })
      }],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(UsersService).toBeDefined();
  });

  describe("when listOfUser()", () => {
    describe("And success", () => {
      it("should return response", async () => {
        let findSpy = jest.spyOn(usersRepository, 'find').mockResolvedValue(users);
        let response = await userService.listOfUser();
        expect(response).toEqual(users);
        expect(findSpy).toHaveBeenCalled();

      })
    })
    describe("And Failed", () => {
      it("should return error", async () => {
        let findSpy = jest.spyOn(usersRepository, 'find').mockRejectedValue(new Error('some internal error'));
        await expect(userService.listOfUser()).rejects.toThrow(HttpException);
        expect(findSpy).toHaveBeenCalled();
      })
    })
  })


  describe("when myBooks()", () => {
    describe("And success", () => {
      it("should return response", async () => {

        const users= {
          id:2,
          userName: "sakshi",
          emailId: "sakshi@hcl.com",
          phoneNumber: 983547692,
          password:"sakshi"
        }
        let getMyBooksSpy = jest.spyOn(usersRepository, 'getMyBooks').mockResolvedValue(users);
        let response = await userService.myBooks(1);
        expect(response).toEqual(users);
        expect(getMyBooksSpy).toHaveBeenCalled();
      })
    })
    describe("And Failed", () => {
      it("should return error", async () => {
        let getMyBooksSpy = jest.spyOn(usersRepository, 'getMyBooks').mockRejectedValue(new Error('some internal error'));

        await expect(await userService.myBooks(1)).rejects.toThrow(HttpException);
        expect(getMyBooksSpy).toHaveBeenCalled();
      })
    })
  })
});

import { Test } from "@nestjs/testing"
import exp from "constants";
import { UsersDTO } from "./users.dto";
import { Users } from "./users.entity";
import { UsersRepository } from "./users.repository";

let users= {
    userName: "sanya",
    emailId: "sanya@hcl.com",
    password: "sanya",
    phoneNumber: 9542285999
}

describe("Given UserRepository", async () => {
    let usersRepository: UsersRepository;
    beforeEach(async () => {
        let module = await Test.createTestingModule({
            providers: [UsersRepository]

        }).compile();
        usersRepository = module.get<UsersRepository>(UsersRepository)
    })

    it("should be defined", () => {
        expect(usersRepository).toBeDefined()

    })
    describe("when getMyBooks()", () => {
        let getMyBooksSpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(users as Users);
        it("should return correct response", () => {
            let response = usersRepository.getMyBooks(2);
            expect(response).toEqual(users)
            expect(getMyBooksSpy).toHaveBeenCalled();
            expect(getMyBooksSpy).toHaveBeenCalledTimes(1);
            expect(getMyBooksSpy).toHaveBeenCalledWith({ id: '2', userName: 'sakshi' });

        })

    })
})
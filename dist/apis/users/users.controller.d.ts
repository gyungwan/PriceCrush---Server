import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserPwdDto } from './dto/find-userPwd.dto';
import { UpdatePwdDto } from './dto/update-userPwd.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        status: {
            code: number;
            message: string;
        };
    }>;
    findId(name: string, phone: string): Promise<string>;
    findPwd(findUserPwdDto: FindUserPwdDto): Promise<{
        status: {
            code: number;
            msg: string;
        };
    }>;
    updatePwd(updatePwdDto: UpdatePwdDto): Promise<import("typeorm").UpdateResult>;
}

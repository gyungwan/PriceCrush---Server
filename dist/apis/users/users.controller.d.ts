import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { FindUserPwdDto } from './dto/find-userPwd.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        status: {
            code: number;
            message: string;
        };
    }>;
    findId(findUserDto: FindUserDto): Promise<string>;
    findPwd(findUserPwdDto: FindUserPwdDto): Promise<string>;
}

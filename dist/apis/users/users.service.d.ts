import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: any): Promise<{
        status: {
            code: number;
            message: string;
        };
    }>;
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    findId({ name, phone }: {
        name: any;
        phone: any;
    }): Promise<string>;
    findUserPWd({ name, phone, email }: {
        name: any;
        phone: any;
        email: any;
    }): Promise<string>;
}

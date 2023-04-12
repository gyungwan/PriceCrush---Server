import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CertificationCodeDto } from './dto/certification-code.dto';
import { LoginDto } from './dto/login.dto';
import { SmsDto } from './dto/sms.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(loginDto: LoginDto, res: Response): Promise<string>;
    restoreAccessToken(req: any): Promise<string>;
    sendsms(smsDto: SmsDto): Promise<{
        status: {
            code: number;
            msg: string;
        };
    }>;
    certification(body: CertificationCodeDto): Promise<{
        stauts: {
            code: number;
            msg: string;
        };
    }>;
    sendemail(): string;
    reset(): string;
}

import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CertificationCodeDto } from './dto/certification-code.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    constructor(authRepository: Repository<Auth>, jwtService: JwtService);
    create(createAuthDto: CreateAuthDto): string;
    setRefreshService({ user, res }: {
        user: any;
        res: any;
    }): void;
    getAccesstoken({ user }: {
        user: any;
    }): string;
    sendsms(phone: string): Promise<{
        status: {
            code: number;
            msg: string;
        };
    }>;
    certification(certificationCodeDto: CertificationCodeDto): Promise<{
        stauts: {
            code: number;
            msg: string;
        };
    }>;
    sendemail(): string;
    reset(): string;
}

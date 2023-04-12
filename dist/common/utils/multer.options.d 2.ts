import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare const multerOptionsFactory: (ConfigService: ConfigService<Record<string, unknown>, false>) => MulterOptions;

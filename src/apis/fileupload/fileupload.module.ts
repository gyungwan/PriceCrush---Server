import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/common/utils/multer.options';
import { FileController } from './fileupload.controller';
import { FileService } from './fileupload.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}

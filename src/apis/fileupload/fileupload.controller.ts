import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './fileupload.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.MulterS3.File) {
    return this.fileService.uploadFile(file);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(@UploadedFiles() files) {
    const imgurl: string[] = [];
    await Promise.all(
      files.map(async (file: Express.MulterS3.File) => {
        const key = await this.fileService.uploadFiles(file);
        imgurl.push(key);
      }),
    );
    return {
      statusCode: 201,
      message: '이미지 등록 성공',
      data: imgurl,
    };
  }
}

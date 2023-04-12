import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileService } from './fileupload.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({
    summary: '파일 업로드',
    description: '파일 업로드 API',
  })
  @ApiResponse({
    description: '이미지 url이 리턴됩니다',
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @UploadedFile()
    file: Express.MulterS3.File,
  ) {
    return this.fileService.uploadFile(file);
  }

  @Post('uploads')
  @ApiOperation({
    summary: '파일 업로드',
    description: '파일 업로드 API',
  })
  @ApiResponse({
    description: '이미지 url이 리턴됩니다',
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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

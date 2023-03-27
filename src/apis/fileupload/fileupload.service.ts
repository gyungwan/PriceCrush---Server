import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  // 단일 파일 업로드
  uploadFile(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return { filePath: file.location };
  }

  async uploadFiles(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일들이 존재하지 않습니다.');
    }
    return file.location;
  }
}

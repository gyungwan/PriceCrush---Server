/// <reference types="multer-s3" />
import { FileService } from './fileupload.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.MulterS3.File): {
        filePath: string;
    };
    uploadFiles(files: any): Promise<string[]>;
}

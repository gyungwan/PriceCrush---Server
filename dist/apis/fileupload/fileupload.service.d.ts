/// <reference types="multer-s3" />
export declare class FileService {
    uploadFile(file: Express.MulterS3.File): {
        filePath: string;
    };
    uploadFiles(file: Express.MulterS3.File): Promise<string>;
}

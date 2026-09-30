export declare class AwsS3Service {
    private s3Service;
    private bucketName;
    constructor();
    uploadFile(fileId: any, buffer: any, contentType: any): Promise<any>;
    getFile(fileId: any): Promise<string | undefined>;
    deleteFile(fileId: string): Promise<string>;
}

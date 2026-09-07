import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class AwsS3Service {

    private s3Service
    private bucketName

    constructor(){
        this.bucketName = process.env.AWS_BUCKET_NAME
        this.s3Service = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
                accessKeyId: process.env.AWS_ACCESS_KEY!,
            }
        })
    }


    async uploadFile(fileId, buffer, contentType){
        if(!fileId || !buffer) throw new BadRequestException('File or buffer is missing')

        const config = {
            Body: buffer,
            Key: fileId,
            Bucket: this.bucketName,
            ContentType:  contentType
        }

        const command = new PutObjectCommand(config)
        await this.s3Service.send(command)

        return fileId
    }


    async getFile(fileId){
        if(!fileId) throw new BadRequestException('file id is provided')

        const config = {
            Key: fileId,
            Bucket: this.bucketName,
        }

        const command = new GetObjectCommand(config)
        const result = await this.s3Service.send(command)
        
        if(result.Body instanceof Readable){
            const chunks:any = []
            for await(const chunk of result.Body){
                chunks.push(chunk)
            }
            const fileBuffer = Buffer.concat(chunks)
            const base64 = fileBuffer.toString('base64')
            const file = `data:${result.ContentType};base64,${base64}`
            return file
        }
    }


    async deleteFile(fileId: string){
        if(!fileId) throw new BadRequestException('file id is provided')

        const config = {
            Key: fileId,
            Bucket: this.bucketName,
        }

        const command = new DeleteObjectCommand(config)
        await this.s3Service.send(command)

        return fileId
    }

}

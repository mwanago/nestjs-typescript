import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import PublicFile from './publicFile.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME')!,
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({ id: fileId });
    if (!file){
      throw new Error(`Cannot find file in repository. FileId:${fileId}`);
    }
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME')!,
      Key: file.key,
    }).promise();
    await this.publicFilesRepository.delete(fileId);
  }

  async deletePublicFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
    const file = await queryRunner.manager.findOne(PublicFile, { id: fileId });
    if (!file){
      throw new Error(`Cannot find file in repository. FileId:${fileId}`);
    }
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME')!,
      Key: file.key,
    }).promise();
    await queryRunner.manager.delete(PublicFile, fileId);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpCode, HttpStatus, Res, BadRequestException
} from '@nestjs/common';
import { AvatarService } from './avatar.service';
import {Avatar} from "./entities/avatar.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Response} from 'express';





@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get("get-all-avatars")
  // async getAllAvatars(@Res() res: Response) {
  async getAllAvatars(@Res() res: Response): Promise<Avatar[]> {
    return this.avatarService.getAllAvatars();
    // const avatars = this.avatarService.getAllAvatars();
    // const buffer = Buffer.from(avatar, 'base64');
    // res.setHeader('Content-Type', 'image/jpeg');
    // res.setHeader('Content-Length', buffer.length.toString());
    // res.end(buffer);
  };

  @Get(":id")
  // async getAvatar(@Param('id') id: string, @Res() res: Response): Promise<Avatar> {
  async getAvatar(@Param('id') id: string, @Res() res: Response) {
    const {avatar, mimetype} = await this.avatarService.getAvatarById(id);


    const buff = Buffer.from(avatar);
    // res.setHeader('Content-Type', "image/jpg");
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-Disposition', `inline; filename="123"`);
    return res.send(buff);
  }



  @ApiOperation({ summary: 'Загрузить фотографию для пользователя' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
                status: HttpStatus.CREATED,
                description: 'Success',
                schema: {
                  example: {
                    status: "ok",
                    message: "success",
                  }
                }
  })
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
  @Post("upload-avatar")
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 2 * 1024 * 1024
    }
  }))
  // async addAvatar(@UploadedFile() file): Promise<{ message: string }> {
  async addAvatar(@UploadedFile() file, @Res() res: Response){

    const {mimetype, originalname} = file;

    if (!mimetype.startsWith("image/")) {
        throw new BadRequestException("Загруженный файл не является изображением")
    }

    const fileSignature = file.buffer.toString("hex", 0, 4); // Проверяем первые 4 байта файла
    if (!this.avatarService.isValidImageSignature(fileSignature, mimetype)) {
      throw new BadRequestException("Загруженный файл не является действительным изображением");
    }

    const compressedBuffer = await this.avatarService.compressImage(file);

    if (compressedBuffer.length > 200000) {
      throw new BadRequestException("Сжатое изображение превышает 200 КБ");
    }

    const result =  await this.avatarService.uploadFile(compressedBuffer.buffer, mimetype, originalname);

    const encodedFilename = encodeURIComponent(result.filename);
            
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodedFilename}`);

    return res.send(result.avatar);
  };





  // для админа
  @Patch("update-avatar/:id")
  async updateAvatarById(@Param("id") id: string): Promise<{ message: string }> {
    return;
  }

}

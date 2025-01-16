import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpCode, HttpStatus, Res
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
    const {avatar} = await this.avatarService.getAvatarById(id);
    const buffer = Buffer.from(avatar, 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', buffer.length.toString());
    res.end(buffer);
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
  async addAvatar(@UploadedFile() file): Promise<{ message: string }> {
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Загруженный файл не является изображением');
    }
    const buffer = file.buffer;
    const fileSignature = buffer.toString('hex', 0, 4); // Проверяем первые 4 байта файла
    const isImage = this.avatarService.isValidImageSignature(fileSignature, file.mimetype);
    if (!isImage) {
      throw new Error('Загруженный файл не является действительным изображением');
    }

    // await this.compressImage(inputPath, outputPath, 1); // Сжать файл, если он выше 1МБ
    // return file.size;

    const filePath = file.buffer.toString('base64');
    return this.avatarService.addAvatar(filePath);
  };

  // для админа
  @Patch("update-avatar/:id")
  async updateAvatarById(@Param("id") id: string): Promise<{ message: string }> {
    return;
  }


}

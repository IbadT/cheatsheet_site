import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Avatar} from "./entities/avatar.entity";
import {Repository} from "typeorm";
import * as sharp from 'sharp'

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
  ) {}


  async uploadFile(data: Buffer) {
    // const filePath = Buffer.from(data.buffer).toString('base64')

    // const fileBase64 = data.toString('base64');
    const result = this.avatarRepository.create({
      avatar: Buffer.from(data.buffer)
    })
    return await this.avatarRepository.save(result);

    // return this.prisma.file.create({
    //     data: {
    //         filename,
    //         mimetype,
    //         size,
    //         // data: Buffer.from(fileBase64, 'base64'),
    //         // data: Buffer.from(filePath),
    //         data: Buffer.from(data.buffer), // img
    //     },
    // });
}




async uploadImage(fileId: string, width: number, height: number) {
  // return this.prisma.image.create({
  //     data: {
  //         width,
  //         height,
  //         file: {connect: {id: fileId}},

  //     },
  // });
}







  async getAllAvatars(): Promise<Avatar[]> {
    return await this.avatarRepository.find();
  };


  async getAvatarById(id: string): Promise<Avatar> {
    return await this.avatarRepository.findOne({
      where: {
        id
      }
    })
  };



  async addAvatar(avatar: any): Promise<{ status: string, message: string }> {
    // проверка
    const addedAvatar: Avatar = this.avatarRepository.create({avatar});
    const addedAvatarResult = await this.avatarRepository.save(addedAvatar);

    if(!addedAvatarResult) {
      throw new BadRequestException("Ошибка при добавлении аватарки");
    }

    return {
      status: "ok",
      message: "Аватарка успешно добавлена"
    }
  };


  async isValidImageSignature(fileSignature: string, mimeType: string) {
    // Для JPEG проверяем сигнатуру "FF D8 FF"
    if (mimeType === 'image/jpeg' && fileSignature.startsWith('ffd8ff')) {
      return true;
    }
    // Для PNG проверяем сигнатуру "89 50 4E 47"
    if (mimeType === 'image/png' && fileSignature.startsWith('89504e47')) {
      return true;
    }
    // Для GIF проверяем сигнатуру "47 49 46 38"
    return mimeType === 'image/gif' && fileSignature.startsWith('47494638');
  }








  async compressImage(file, maxSize: number = 200000) {
    const mimetype = file.mimetype;
    if (mimetype === "image/jpeg") {
        // Для JPEG сжимаем с уменьшением размера и качеством 80%
        const compressedBuffer = await sharp(file.buffer)
            .resize({width: 800})
            .jpeg({quality: 99})
            .toBuffer();
        file.buffer = compressedBuffer;
        file.size = compressedBuffer.length;
    } else if (mimetype === "image/png") {
        // Для PNG сжимаем с сохранением качества (без потерь)
        const compressedBuffer = await sharp(file.buffer)
            .resize({ width: 800 })
            .png({ quality: 99, compressionLevel: 9, adaptiveFiltering: true })
            .toBuffer();
        file.buffer = compressedBuffer;
        file.size = compressedBuffer.length;
    } else if (mimetype === "image/gif") {
        // Для GIF сжимаем с уменьшением размера
        const compressedBuffer = await sharp(file.buffer)
            .resize({ width: 800 }) // Уменьшаем размер
            .gif({ effort: 3 }) // Пример сжатия для GIF (3 — это степень усилия сжатия)
            .toBuffer();
        file.buffer = compressedBuffer;
        file.size = compressedBuffer.length;
    }

    return file;

}
}

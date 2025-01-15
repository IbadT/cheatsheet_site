import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Avatar} from "./entities/avatar.entity";
import {Repository} from "typeorm";

@Injectable()
export class AvatarService {
  constructor(
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
  ) {}

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



  async addAvatar(avatar: string): Promise<{ status: string, message: string }> {
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
}

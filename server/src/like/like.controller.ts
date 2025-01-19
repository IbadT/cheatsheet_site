import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AddLikeDto } from './dto/add-like.dto';




@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async addLike(@Body() body: AddLikeDto) {
    return this.likeService.addLike(body);
  }

  @Delete(":post_id/:user_id")
  async removeLike(@Param('post_id') post_id: string, @Param('user_id') user_id: string) {
    return this.likeService.removeLike(post_id, user_id);
  }

}

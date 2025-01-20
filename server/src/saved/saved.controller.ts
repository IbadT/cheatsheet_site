import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { SavedService } from './saved.service';
import { AddPostToSavedDto } from './dto/add-post-to-saved.dto';

@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Get(":user_id")
  async getAllSavedPost(@Param('user_id') user_id: string) {
    return this.savedService.getAllSavedPost(user_id);
  };

  // пагинация
  @Get("pagin/:user_id")
  async getLimitSavedPostPerPage(
    @Param("user_id") user_id: string,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 5,
  ) {
    return this.savedService.getLimitSavedPostPerPage(user_id, page, limit);
  }

  @Post()
  async addPostToSaved(
    @Body() body: AddPostToSavedDto,
  ) {
    return this.savedService.addPostToSaved(body)
  }

  @Delete(":user_id/:post_id")
  async removePostFromSaved(
    @Param('user_id') user_id: string,
    @Param('post_id') post_id: string
  ) {
    return this.savedService.removePostFromSaved(user_id, post_id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';





// получить пост(author(avarat, user_name), post, likes(колличество), saved(колличество), comments(колличество, authors))

//     получить лайка конкретного поста
//     получить комментарии конкретного поста
//     получить колличество кто сохранил этот пост

// для админа посмотреть, кто лайкнул
// для админа посмотреть, кто написал сообщение и какое написал сообщение





// при удалении нужно выставить { cascade: true, onDelete: 'CASCADE' }


@ApiTags("Posts")
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get()
  async getAllPostFromAdmin(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.postService.getAllPostFromAdmin(page, limit);
  };

  
  @Get(":id")
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  };


  @Post()
  async addPost(@Body() body: CreatePostDto) {
    return this.postService.addPost(body);
  }

  
  @Patch(':/id')
  async editPostById(
    @Param('id') id: string,
    @Body() body: CreatePostDto
  ) {
    return this.postService.editPostById(id, body);
  };


  @Delete(':id')
  async deletePostById(@Param('id') id: string) {
    return this.postService.deletePostById(id);
  }

}

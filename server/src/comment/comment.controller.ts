import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentToPostDto } from './dto/create-comment-to-post.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addCommentToPost(@Body() body: CreateCommentToPostDto) {
    return this.commentService.addCommentToPost(body);
  };

  @Delete(":id")
  async removeCommentFromPost(@Param('id') id: string) {
    return this.commentService.removeCommentFromPost(id);
  }

}

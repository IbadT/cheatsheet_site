import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentToPostDto } from './dto/create-comment-to-post.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly userService: UserService,
    private readonly postService: PostService
  ) {}

  async watchWhoWriteCommentsToPost(post_id) {
    const post = await this.postService.getOnlyPost(post_id);
    return await this.commentRepository.find({
      where: {
        post: {
          id: post.id
        }
      },
      relations: ['user']
    });
  }


  async addCommentToPost(body: CreateCommentToPostDto) {
    const user = await this.userService.getUser(body.user_id);
    const post = await this.postService.getOnlyPost(body.post_id);
    const addedCommentToPost = this.commentRepository.create({
      text: body.text,
      user,
      post
    });
    await this.commentRepository.save(addedCommentToPost);
    return {
      status: HttpStatus.OK,
      message: "Комментарий успешно добавлен"
    }
  };



  async removeCommentFromPost(id: string) {
    const currentComment = await this.commentRepository.findOneBy({ id });
    const removedResult = await this.commentRepository.remove(currentComment);
    if(!removedResult) {
      throw new NotFoundException("Комментария с таким id не существует");
    };

    return {
      status: HttpStatus.OK,
      message: "Комментарий успешно удален"
    };
  }

}

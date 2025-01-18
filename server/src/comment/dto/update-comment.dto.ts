import { PartialType } from '@nestjs/swagger';
import { CreateCommentToPostDto } from './create-comment-to-post.dto';

export class UpdateCommentDto extends PartialType(CreateCommentToPostDto) {}

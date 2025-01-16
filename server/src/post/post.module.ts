import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post.entity";
import {User} from "../user/entities/user.entity";
import {CommentEntity} from "../entities/comment.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([User, PostEntity, CommentEntity]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

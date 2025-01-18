import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostEntity} from "./entities/post.entity";
import {User} from "../user/entities/user.entity";

import { Role } from 'src/entities/role.entity';
import { LikeEntity } from 'src/entities/like.entity';
import { SavedPost } from 'src/entities/saved-post.entity';
import { UserModule } from 'src/user/user.module';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
      CommentEntity
    ]),
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserModule,
    PostModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}

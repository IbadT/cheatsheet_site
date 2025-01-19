import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from 'src/entities/like.entity';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { PostEntity } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity, PostEntity, User]),
    UserModule,
    PostModule,
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}

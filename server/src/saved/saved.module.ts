import { Module } from '@nestjs/common';
import { SavedService } from './saved.service';
import { SavedController } from './saved.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedPostEntity } from './entities/saved.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PostEntity } from 'src/post/entities/post.entity';
import { PostModule } from 'src/post/post.module';
import { CommentEntity } from 'src/comment/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SavedPostEntity, 
    ]),
    UserModule,
    PostModule
  ],
  controllers: [SavedController],
  providers: [SavedService],
  exports: [SavedService]
})
export class SavedModule {}

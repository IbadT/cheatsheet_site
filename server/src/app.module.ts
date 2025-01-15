import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";
import { AvatarModule } from './avatar/avatar.module';
import { PostModule } from './post/post.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      DatabaseModule,
      UserModule,
      AvatarModule,
      PostModule,
      FriendModule,
  ],
})
export class AppModule {}

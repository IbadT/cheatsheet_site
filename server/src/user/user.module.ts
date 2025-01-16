import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {Role} from "../entities/role.entity";
import {AvatarService} from "../avatar/avatar.service";
import {AvatarModule} from "../avatar/avatar.module";
import {LikeEntity} from "../entities/like.entity";
import {SavedPost} from "../entities/saved-post.entity";
import {FriendEntity} from "../friend/entities/friend.entity";


export const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};


@Module({
  imports: [
      TypeOrmModule.forFeature([User, Role, LikeEntity, SavedPost, FriendEntity]),
      DatabaseModule,
      JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "60s"}
      }),
      AvatarModule
  ],
  controllers: [UserController],
  providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

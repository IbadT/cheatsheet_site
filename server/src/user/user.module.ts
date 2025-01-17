import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {Role} from "../entities/role.entity";
import {AvatarModule} from "../avatar/avatar.module";
import {LikeEntity} from "../entities/like.entity";
import {SavedPost} from "../entities/saved-post.entity";
import {FriendEntity} from "../friend/entities/friend.entity";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "../guards/local.strategy";
import {JwtStrategy} from "../guards/jwt.strategy";


export const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};


@Module({
  imports: [
      // PassportModule.register({ defaultStrategy: 'jwt' }),
      TypeOrmModule.forFeature([User, Role, LikeEntity, SavedPost, FriendEntity]),
      DatabaseModule,
      PassportModule,
      JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          // secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
          signOptions: { expiresIn: "60s"}
      }),
      AvatarModule
  ],
  controllers: [UserController],
  providers: [JwtStrategy, UserService],
    exports: [UserService, JwtModule],
})
export class UserModule {}

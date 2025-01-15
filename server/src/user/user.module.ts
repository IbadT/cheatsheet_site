import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseModule} from "../database/database.module";
import {JwtModule} from "@nestjs/jwt";
import {AvatarModule} from "../avatar/avatar.module";
import {Avatar} from "../avatar/entities/avatar.entity";
import {Role} from "../entities/role.entity";


export const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};


@Module({
  imports: [
      TypeOrmModule.forFeature([User, Role]),
      DatabaseModule,
      JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "60s"}
      })
  ],
  controllers: [UserController],
  providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Avatar} from "./entities/avatar.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Avatar]),
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}

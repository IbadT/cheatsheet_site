import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import {FriendEntity} from "./entities/friend.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([User, FriendEntity])
  ],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}

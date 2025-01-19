import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import {FriendEntity} from "./entities/friend.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FriendEntity]),
    UserModule
  ],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}

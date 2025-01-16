import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import {ApiTags} from "@nestjs/swagger";


// отправить запрос в друзья
// получить все запросы в друзья
// по id одобрить запрос в дурзья
// получить всех друзей

@ApiTags('Friend')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get("get-friends/:id")
  async getFriends(@Param("id") id: string) {
    return this.friendService.getFriends(id);
  }


  @Post('send/:requesterId/:addresseeId')
  async sendFriendRequest(
      @Param('requesterId') requesterId: string,
      @Param('addresseeId') addresseeId: string
  ) {
    return this.friendService.sendFriendRequest(requesterId, addresseeId);
  };


  @Post('accept/:requestId')
  async acceptFriendRequest(@Param('requestId') requestId: string) {
    return this.friendService.acceptFriendRequest(requestId);
  }

}

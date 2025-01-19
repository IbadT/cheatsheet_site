import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import {ApiTags} from "@nestjs/swagger";


// отправить запрос в друзья
// получить все запросы в друзья
// по id одобрить запрос в дурзья
// получить всех друзей

// # ДРУЗЬЯ
// возможность добавить в друзья
// просмотреть всех своих друзей

@ApiTags('Friend')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get("get-friends/:id")
  async getFriends(@Param("id") id: string) {
    return this.friendService.getFriends(id);
  }


  @Get(":id")
  async getAllFriendRequests(@Param('id') id: string) {
    return this.friendService.getAllFriendRequests(id);
  }


  @Post('send/:requesterId/:addresseeId')
  async sendFriendRequest(
      @Param('requesterId') requesterId: string,
      @Param('addresseeId') addresseeId: string
  ) {
    return this.friendService.sendFriendRequest(requesterId, addresseeId);
  };


  @Post('accept/:request_id/:addressee_id')
  async acceptFriendRequest(@Param('request_id') request_id: string, @Param('addressee_id') addressee_id: string) {
    return this.friendService.acceptFriendRequest(request_id, addressee_id);
  };


  @Patch(":requester_id/:addressee_id")
  async removeFromFriend(@Param('requester_id') requester_id: string, @Param('adressee_id') addressee_id: string) {
    return this.friendService.removeFromFriend(requester_id, addressee_id);
  };


  @Delete(":requester_id/:addressee_id")
  async removeUserFromFriendRequestList(@Param('requester_id') requester_id: string, @Param('addressee_id') addressee_id: string) {
    return this.friendService.removeUserFromFriendRequestList(requester_id, addressee_id)
  }

}

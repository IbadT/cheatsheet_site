import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import {FriendEntity} from "./entities/friend.entity";
import {User} from "../user/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class FriendService {
  constructor(
      @InjectRepository(FriendEntity)
      private readonly friendRepository: Repository<FriendEntity>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {}

  async getFriends(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
          'sentFriendRequests',
          'sentFriendRequests.addressee',
          'receivedFriendRequests',
          'receivedFriendRequests.requester'
      ]
    });

    if (!user) {
      throw new Error('User not found');
    }

    const friends = user.sentFriendRequests
        .filter(friend => friend.isAccepted)
        .map(friend => friend.addressee)
        .concat( user.receivedFriendRequests
            .filter(friend => friend.isAccepted)
            .map(friend => friend.requester)
        );
    return friends;
  }

  async sendFriendRequest(requesterId: string, addresseeId: string): Promise<FriendEntity> {
    const requester = await this.userRepository.findOne({ where: { id: requesterId }});
    const addressee = await this.userRepository.findOne({ where: { id: addresseeId } });

    if (!requester || !addressee) {
      throw new Error('Requester or addressee not found');
    }

    const friendRequest = this.friendRepository.create({ requester, addressee });
    return this.friendRepository.save(friendRequest);
  }

  async acceptFriendRequest(requestId: string): Promise<FriendEntity> {
    const friendRequest = await this.friendRepository.findOne({ where: { id: requestId } });

    if (!friendRequest) {
      throw new Error('Friend request not found');
    }

    friendRequest.isAccepted = true;
    return this.friendRepository.save(friendRequest);
  };
}

import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import {FriendEntity} from "./entities/friend.entity";
import {User} from "../user/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { UserService } from 'src/user/user.service';

@Injectable()
export class FriendService {
  constructor(
      @InjectRepository(FriendEntity)
      private readonly friendRepository: Repository<FriendEntity>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      private readonly userService: UserService
  ) {}


  // просмотреть всех друзей
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


  // просмотреть все запросы в друзья
  async getAllFriendRequests(id: string) {
    const mainProfile = await this.userService.getUser(id);
    return await this.friendRepository.find({
      where: {
        isAccepted: false,
        addressee: {
          id: mainProfile.id 
        }
      },
      relations: ['requester', 'addressee'],
      select: {
        id: true,
        isAccepted: true,
        requester: {
          id: true,
          user_name: true,
          bio: true,
          rating: true,
          email: true,
        },
        addressee: {
          id: true,
          user_name: true,
          bio: true,
          rating: true,
          email: true,
        }
      }
    });
  };




  async sendFriendRequest(requester_id: string, addressee_id: string): Promise<{ status: number, message: string }> {
    // const requester = await this.userRepository.findOne({ where: { id: requesterId }});
    // const addressee = await this.userRepository.findOne({ where: { id: addresseeId } });
    const { requester, addressee } = await this.getRequesterAndAddressee(requester_id, addressee_id);

    if (!requester || !addressee) {
      throw new Error('Requester or addressee not found');
    }

    const existRequestToFriend = await this.friendRepository.findOne({
      where: {
        requester: {
          id: requester.id
        },
        addressee: {
          id: addressee.id
        }
      }
    });

    if(existRequestToFriend) {
      return {
        status: HttpStatus.GONE, 
        message: "Запрос в дружбу уже отправлен"
      }
    }

    const friendRequest = this.friendRepository.create({ requester, addressee });
    await this.friendRepository.save(friendRequest);
    return {
      status: HttpStatus.OK,
      message: "Запрос на дружбу отправлен"
    }
  }



  async acceptFriendRequest(requester_id: string, addressee_id: string): Promise<{ status: number, message: string }> {
    // const requester = await this.userService.getUser(requesterId);
    // const addressee = await this.userService.getUser(addresseeId);
    const { requester, addressee } = await this.getRequesterAndAddressee(requester_id, addressee_id);

    const friendRequest = await this.friendRepository.findOne({ 
      where: { 
        requester: {
          id: requester.id
        },
        addressee: {
          id: addressee.id
        }
      } 
    });

    if (!friendRequest) {
      throw new Error('Friend request not found');
    }

    friendRequest.isAccepted = true;
    await this.friendRepository.save(friendRequest);
    return {
      status: HttpStatus.OK,
      message: "Запрос на дружбу принят"
    }
  };



  async removeFromFriend(requester_id: string, addressee_id: string) {
    // const requester = await this.userRepository.findOne({ where: { id: requesterId }});
    // const addressee = await this.userRepository.findOne({ where: { id: addresseeId } });

    // const requester = await this.userService.getUser(requesterId);
    // const addressee = await this.userService.getUser(addresseeId);

    const { requester, addressee } = await this.getRequesterAndAddressee(requester_id, addressee_id);

    const findThisFriend = await this.friendRepository.findOne({
      where: {
        isAccepted: true,
        requester: {
          id: requester.id
        },
        addressee: {
          id: addressee.id
        }
      }
    });

    findThisFriend.isAccepted = false;
    await this.friendRepository.save(findThisFriend);
    return {
      status: HttpStatus.OK,
      message: "Вы убрали пользователя из друзей"
    }
  };


  async removeUserFromFriendRequestList(requester_id: string, addressee_id: string) {
    // const requester = await this.userService.getUser(requester_id);
    // const addressee = await this.userService.getUser(addressee_id);
    const { requester, addressee } = await this.getRequesterAndAddressee(requester_id, addressee_id);

    const requestForRemove = await this.friendRepository.findOne({
      where: {
        requester: {
          id: requester.id
        },
        addressee: {
          id: addressee.id
        },
        isAccepted: false
      }
    });
    if(!requestForRemove) {
      throw new BadRequestException("Такого запроса в друзья нет");
    };

    await this.friendRepository.remove(requestForRemove);
    return {
      status: HttpStatus.OK,
      message: "Запрос успешно удален"
    }
  }






  async getRequesterAndAddressee(requester_id: string, addressee_id: string) {
    const requester = await this.userService.getUser(requester_id);
    const addressee = await this.userService.getUser(addressee_id);
    return {
      requester,
      addressee
    }
  }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeEntity } from 'src/entities/like.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/entities/user.entity';
import { AddLikeDto } from './dto/add-like.dto';


@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async watchWhoLikeThisPost(post_id: string) {
    const post = await this.postService.getOnlyPost(post_id);
    return await this.likeRepository.find({
      where: {
        post: {
          id: post.id
        }
      },
      relations: ['user']
    });
    
  }

  async addLike(body: AddLikeDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: body.user_id
      }
    })

    const post = await this.postService.getOnlyPost(body.post_id);
    const createdLike = this.likeRepository.create({
      user,
      post,
    });
    await this.likeRepository.save(createdLike);
    return {
      status: "ok",
      message: "Success"
    }
  };


  async removeLike(post_id: string, user_id: string) {
    const user = await this.userRepository.findOneBy({ id: user_id })
    const post = await this.postService.getOnlyPost(post_id);
    
    const curentLike = await this.likeRepository.findOneBy({ 
      post: {
        id: post.id
      }, 
      user: {
        id: user.id
      }
    });
    
    return await this.likeRepository.remove(curentLike);
  }

}

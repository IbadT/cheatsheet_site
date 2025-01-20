import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { AddPostToSavedDto } from './dto/add-post-to-saved.dto';
import { Repository } from 'typeorm';
import { SavedPostEntity } from './entities/saved.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SavedService {
  constructor(
    @InjectRepository(SavedPostEntity)
    private readonly savedPostRepository: Repository<SavedPostEntity>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async getAllSavedPost(user_id: string) {
    const user = await this.userService.getUser(user_id);
    return await this.savedPostRepository.find({
      where: {
        user: {
          id: user.id
        }
      },
      relations: ['user', 'post'],
      select: {
        id: true,
        user: {
          id: true,
          user_name: true,
          bio: true,
          rating: true,
          email: true,
        },
        post: {
          id: true,
          title: true,
          text: true
        }
      }
    })
  };

  async getSavedPostById(user_id: string, post_id: string) {
    return await this.savedPostRepository.findOneBy({ 
      user: {
        id: user_id
      },
      post: {
        id: post_id
      }
    })
  }

  async getLimitSavedPostPerPage(user_id: string, page: number, limit: number) {
    const user = await this.userService.getUser(user_id);
    const [data, total] = await this.savedPostRepository.findAndCount({
      where: {
        user: {
          id: user.id
        }
      },
      skip: (page-1) * limit,
      take: limit,
      relations: ['user', 'post'],
      order: {
        created_at: 'DESC'
      },
    });
    return data; // вернуть конкретные поля
  };

  async addPostToSaved(body: AddPostToSavedDto) {
    const user = await this.userService.getUser(body.user_id);
    const post = await this.postService.getOnlyPost(body.post_id);

    if(!user || !post) {
      throw new BadRequestException("Пользователь или пост не найден")
    }
    
    const addedPostToSaved = this.savedPostRepository.create({
      user,
      post
    });

    await this.savedPostRepository.save(addedPostToSaved);
    
    return {
      status: HttpStatus.OK,
      message: "Пост добавлен в избранное"
    };
  };


  async removePostFromSaved(user_id: string, post_id: string) {
    const user = await this.userService.getUser(user_id);
    const post = await this.postService.getOnlyPost(post_id);
    const savedPostForRemove = await this.getSavedPostById(user.id, post.id);
    await this.savedPostRepository.remove(savedPostForRemove);
    return {
      status: HttpStatus.OK,
      message: "Пост успешно удален из избранного"
    }
  };

}

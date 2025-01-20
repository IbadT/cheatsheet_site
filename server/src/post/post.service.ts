import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { roles } from 'src/enums/roles.enum';
// import { Like } from 'src/like/entities/like.entity';
// import { Comment } from 'src/comment/entities/comment.entity';
import { LikeEntity } from 'src/entities/like.entity';
import { SavedPost } from 'src/entities/saved-post.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly userService: UserService
  )
  {}

  async getAllPostFromAdmin(page: number, limit: number) {
    const admin = await this.userService.getAdmin();
    const [data, total] = await this.postRepository.findAndCount({
      where: {
        user: {
          id: admin.id,

        }
      },
      skip: (page-1) * limit,
      take: limit,
      relations: ['likes', 'comments', 'user', 'savedPosts'],
      order: {
        created_at: "DESC"
      }
    })
    
    // const adminPosts = await this.postRepository.createQueryBuilder('post')
    //   .leftJoinAndSelect('post.likes', 'likes')
    //   .leftJoinAndSelect('post.comments', 'comments')
    //   .leftJoin('post.user', 'user')
    //   .addSelect(['user.id'])
    //   .where('user.id = :userId', { userId: admin.id })
    //   .getMany();
    
    
    
    // получить пост(author(avarat, user_name), post, likes(колличество), saved(колличество), comments(колличество, authors))
    const allPosts = data.map(post => {
      // const likesCount = post.likes.length;
      // const commentsCount = post.comments.length;
      // const savedPost = post.savedPosts.length;
      
      return {
        ...post,
        likes: post.likes.length,
        comments: post.comments.length,
        savedPosts: post.savedPosts.length,
        user: {
          user_name: post.user.user_name,
          rating: post.user.rating,
          bio: post.user.bio,
          avatar_id: post.user.avatar_id
        }
      }

    })
    return allPosts;
  }


  async getOnlyPost(id: string) {
    return await this.postRepository.findOne({
      where: {
        id
      }
    })
  }


  async getPostById(id: string) {
    
    const adminPost = await this.postRepository.findOne({
      where: {
        id
      },
      relations: ['likes', 'comments', 'savedPosts']
    })
    
    const likesCount = adminPost.likes.length;
    const commentsCount = adminPost.comments.length;
    const savedPostCount = adminPost.savedPosts.length;
    // console.log({
    //   ...adminPost,
    //   likes: likesCount,
    //   comments: commentsCount,
    //   savedPosts: savedPostCount
    // });
    
    return {
      ...adminPost,
      likes: likesCount,
      comments: commentsCount,
      savedPosts: savedPostCount
    };

  };

  async addPost(body: CreatePostDto) {
    const admin = await this.userService.getAdmin();
    
    const createdPostResult = this.postRepository.create({
      ...body,
      user: admin
    })    

    // const createLikeResult = this.likeRepository.create({
    //   post: createdPostResult
    // })

    // const createdCommentResult = this.commentRepository.create({
    //   post: createdPostResult
    // })

    // const savedPostResult = this.savedRepository.create({
    //   post: createLikeResult
    // })

    await this.postRepository.save(createdPostResult);
    // await this.likeRepository.save(createLikeResult);
    // await this.commentRepository.save(createdCommentResult);
    // await this.savedRepository.save(savedPostResult);  
    return {
      message: "Success",
      status: "ok"
    }
  
  };

  async editPostById(id: string, body: CreatePostDto) {
    const post = await this.postRepository.findOneBy({
      id
    });
    return await this.postRepository.save({
      ...post,
      title: body.title,
      text: body.text
    });
  }

  async deletePostById(id: string) {
    const post = await this.postRepository.findOneBy({ id });
    return await this.postRepository.remove(post);
  }


}

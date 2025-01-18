import { PostEntity } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from 'typeorm';

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.likes)
    @JoinColumn({
        name: "user_id"
    })
    user: User;

    @ManyToOne(() => PostEntity, post => post.likes)
    @JoinColumn({
        name: "post_id"
    })
    post: PostEntity;



    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updated_at: Date;
}

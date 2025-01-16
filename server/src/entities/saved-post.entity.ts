import {Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn} from 'typeorm';
import {PostEntity} from "../post/entities/post.entity";
import {User} from "../user/entities/user.entity";

@Entity('saved_posts')
export class SavedPost {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.savedPosts)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

    // @ManyToOne(() => PostEntity, post => post.savedPosts)
    // post: PostEntity;



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

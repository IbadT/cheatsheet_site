import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
} from 'typeorm';
import {PostEntity} from "../post/entities/post.entity";
import {User} from "../user/entities/user.entity";


@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    text: string;

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

    @ManyToOne(() => PostEntity, post => post.comments)
    @JoinColumn({
        name: "post_id",
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

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {LikeEntity} from "../../entities/like.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";



@Entity("posts")
export class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar")
    title: string;

    @Column("varchar")
    text: string;


    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({
        name: "user_id",
    })
    user: User;

    // { cascade: true, onDelete: 'CASCADE' }

    @OneToMany(() => LikeEntity, like => like.post)
    likes: LikeEntity[];

    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[];

    @OneToMany(() => PostEntity, post => post.savedPosts)
    savedPosts: PostEntity[];




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

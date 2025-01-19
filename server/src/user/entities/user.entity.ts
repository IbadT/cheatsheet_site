import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {IsUUID} from "class-validator";
import {Avatar} from "../../avatar/entities/avatar.entity";
import {Role} from "../../entities/role.entity";
import {PostEntity} from "../../post/entities/post.entity";
import {SavedPost} from "../../entities/saved-post.entity";
import {LikeEntity} from "../../entities/like.entity";
import {FriendEntity} from "../../friend/entities/friend.entity";
import { CommentEntity } from "src/comment/entities/comment.entity";



// поле user_name - должно быть уникальным(при регистрации не создавался ползователь)
@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid', {
        comment: "id пользователя",
        name: "id"
    })
    @IsUUID("4")
    id: string;


    @Column("varchar",{
        unique: true,
    })
    user_name: string;


    @Column("varchar", {
        default: "",
    })
    bio: string;

    @Column("int", {
        default: 0,
    })
    rating: number;

    @Column("varchar", {
        unique: true,
    })
    email: string;

    @Column("varchar")
    password: string;


    @OneToMany(() => FriendEntity, friend => friend.requester)
    sentFriendRequests: FriendEntity[];

    @OneToMany(() => FriendEntity, friend => friend.addressee)
    receivedFriendRequests: FriendEntity[];



    @OneToOne(() => Avatar, { eager: true }) // Используем eager loading для автоматической загрузки аватара 
    @JoinColumn({ name: 'avatar_id' }) 
    avatar_id: Avatar;




    @OneToMany(() => PostEntity, post => post.user)
    posts: PostEntity[];


    @OneToMany(() => LikeEntity, like => like.user)
    likes: LikeEntity[];

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[];

    @OneToMany(() => SavedPost, savedPost => savedPost.user)
    savedPosts: SavedPost[];




    @ManyToOne(() => Role, role => role.users) 
    @JoinColumn({ name: 'role_id' }) 
    role: Role;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"
    })
    public updated_at: Date;

}

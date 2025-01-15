import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {IsUUID} from "class-validator";
import {Avatar} from "../../avatar/entities/avatar.entity";
import {Role} from "../../entities/role.entity";

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

    // @Column("varchar", {
    //     default: "",
    // })
    // avatar: string;

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

    @OneToOne(() => Avatar)
    @JoinColumn({
        name: "avatar_id",
    })
    avatar_id: Avatar;

    @OneToOne(() => Role)
    @JoinColumn({
        name: 'role_id' }
    )
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

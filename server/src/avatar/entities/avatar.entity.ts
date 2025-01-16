import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne} from 'typeorm';
import {User} from "../../user/entities/user.entity";


@Entity('avatars')
export class Avatar {
    @PrimaryGeneratedColumn('uuid', {
        comment: 'id картинки',
        name: 'id'
    })
    id: string;

    @Column('varchar', {
        nullable: false,
    })
    avatar: string;

    @OneToOne(() => User, (user) => user.role)
    user: User;


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

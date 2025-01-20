import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import {User} from "../../user/entities/user.entity";


@Entity('avatars')
export class Avatar {
    @PrimaryGeneratedColumn('uuid', {
        comment: 'id картинки',
        name: 'id'
    })
    id: string;

    
    @Column('bytea', { nullable: false })
    avatar: Buffer; 
    

    @OneToOne(() => User, (user) => user.avatar_id) 
    @JoinColumn({
        name: "user_id"
    })
    user: User;

    @Column('varchar', {
        default: null
    })
    mimetype: string

    @Column('varchar', {
        default: null
    })
    filename: string


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

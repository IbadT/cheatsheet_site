import {Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany} from 'typeorm';
import { IsUUID } from 'class-validator';
import {User} from "../user/entities/user.entity";


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid', {
        comment: 'id роли',
        name: 'id'
    })
    @IsUUID('4')
    id: string;

    @Column('varchar', {
        unique: true,
    })
    role_name: string;

    // @OneToOne(() => User, (user) => user.role)
    // user: User;

    @OneToMany(() => User, user => user.role) 
    users: User[];



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

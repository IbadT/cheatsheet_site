import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsUUID} from "class-validator";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid', {
        comment: "id пользователя",
        name: "id"
    })
    @IsUUID("4")
    id: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    password: string;


}

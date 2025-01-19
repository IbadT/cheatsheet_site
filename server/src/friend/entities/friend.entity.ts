import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";

@Entity("friends")
export class FriendEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;


    @ManyToOne(() => User, user => user.sentFriendRequests)
    @JoinColumn({
        name: "requester_id"
    })
    requester: User;

    @ManyToOne(() => User, user => user.receivedFriendRequests)
    @JoinColumn({
        name: "addressee_id"
    })
    addressee: User;

    @Column('boolean', { default: false })
    @JoinColumn({
        name: "is_accepted",
    })
    isAccepted: boolean;






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

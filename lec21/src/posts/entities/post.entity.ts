import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    title!: string;

    @Column()
    desc!: string;

    @ManyToOne(() => User, (user) => user.posts, {cascade: true})
    author!: User;
}

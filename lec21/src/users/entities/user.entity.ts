import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @Column()
    name!: string;


    @Column({unique: true})
    email!: string


    @Column()
    age!: number

    @OneToMany(() => Post, (post) => post.author)
    posts!: Post[]
}

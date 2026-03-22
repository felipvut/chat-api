import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm"
import Person from "./Person";

@Entity("messages")
export default class Message {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    chats_uuid: string;

    @Column()
    message: string;

    @Column()
    author_uuid: string;

    @ManyToOne(() => Person, (author) => author.chats_author)
    @JoinColumn({ name: 'author_uuid' })
    author: Person
}
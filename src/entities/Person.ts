import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"
import Chat from "./Chat";
import Message from "./Message";

@Entity("persons")
export default class Person {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @Column()
    name: string;

    @Column()
    users_uuid: string;

    @Column()
    files_uuid: string;

    @OneToMany(() => Chat, (chat) => chat.author)
    chats_author: Chat[]

    @OneToMany(() => Chat, (chat) => chat.contact)
    chats_contact: Chat[]

    @OneToMany(() => Message, (message) => message.author)
    messages: Message[]
}
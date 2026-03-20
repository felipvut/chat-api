import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from "typeorm"
import Chat from "./Chat";

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

    @OneToMany(() => Chat, (chat) => chat.author)
    chats_author: Chat[]

    @OneToMany(() => Chat, (chat) => chat.contact)
    chats_contact: Chat[]
}
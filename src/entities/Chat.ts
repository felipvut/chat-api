import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import Person from "./Person";

@Entity("chats")
export default class Chat {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @Column()
    last_message: string;

    @Column()
    author_uuid: string;

    @ManyToOne(() => Person, (author) => author.chats_author)
    @JoinColumn({ name: 'author_uuid' })
    author: Person

    @Column()
    contact_uuid: string;
    
    @ManyToOne(() => Person, (contact) => contact.chats_contact)
    @JoinColumn({ name: 'contact_uuid' })
    contact: Person
}
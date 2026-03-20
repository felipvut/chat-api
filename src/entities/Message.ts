import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity("messages")
export default class Message {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @Column()
    chats_uuid: string;

    @Column()
    message: string;
}
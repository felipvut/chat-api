import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity("users")
export default class User {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @Column()
    email: string;

    @Column()
    password: string;

}
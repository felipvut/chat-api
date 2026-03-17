import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity("persons")
export default class Person {

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @Column()
    name: string;

    @Column()
    users_uuid: string;
}
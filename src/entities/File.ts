import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("files")
export default class File{

    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column({ type: "bytea", nullable: false })
    data: Buffer;

    @Column()
    mimetype: string;

}
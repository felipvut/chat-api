import { DataSource } from "typeorm";
import dotenv from "dotenv";
import User from "../entities/User";
import Person from "../entities/Person";
dotenv.config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT || 8080),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    ssl: false,
    entities: [
        Person, User,
    ],
    synchronize: false,
    logging: true,
})

export default AppDataSource

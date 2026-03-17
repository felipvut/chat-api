import AppDataSource from "../database";
import User from "../entities/User";
import { DefaultService } from "./DefaultService";
import dotenv from "dotenv";
dotenv.config()
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ServiceResponse } from "../../types/ServiceResponse";
import { PersonsService } from "./PersonsService";

export class UsersService extends DefaultService {
    repository = AppDataSource.getRepository(User)

    async login(body: any): Promise<ServiceResponse> {
        try {
            const users = await this.repository.find({
                where: {
                    email: body.email
                }
            })
            const comparePassword = await bcrypt.compare(body.password, users[0].password)
            let token = null
            if (comparePassword) {
                token = jwt.sign(JSON.parse(JSON.stringify(users[0])), process.env.JWT_SECRET, {
                    expiresIn: '1d'
                });
            }

            return {
                data: token,
                success: true,
                status: 200
            };
        } catch (e) {
            console.log(e);
            return {
                data: null,
                success: false,
                status: 500
            }
        }
    }

    async register(body: any): Promise<ServiceResponse> {
        try {
            if (!body.password || body.password.length < 6) {
                return {
                    data: null,
                    success: false,
                    status: 400,
                    message: 'Senha deve conter no mínimo 6 caracteres'
                }
            }

            if (!body.email) {
                return {
                    data: null,
                    success: false,
                    status: 400,
                    message: 'Email é obrigatório'
                }
            }
            if (!body.name) {
                return {
                    data: null,
                    success: false,
                    status: 400,
                    message: 'Nome é obrigatório'
                }
            }

            const users = await this.repository.find({
                where: {
                    email: body.email
                }
            })

            if (users.length > 0) {
                return {
                    data: null,
                    success: false,
                    status: 400,
                    message: 'Email já cadastrado'
                }
            }

            const cryptedPassword = await bcrypt.hash(body.password, 10)
            body.password = cryptedPassword;

            const user = {
                email: body.email,
                password: body.password,
                created_at: new Date()
            }

            const createdUser = await this.repository.save(user);

            if (!createdUser) {
                return {
                    data: null,
                    success: false,
                    status: 500,
                    message: 'Erro ao criar usuário'
                }
            }

            const person = {
                name: body.name,
                users_uuid: createdUser.uuid,
                created_at: new Date()
            }

            const personsService = new PersonsService();
            const createdPerson = await personsService.repository.save(person);

            if (!createdPerson) {
                return {
                    data: null,
                    success: false,
                    status: 500,
                    message: 'Erro ao criar usuário'
                }
            }

            return {
                data: createdUser,
                success: true,
                status: 201
            }
        } catch (e) {
            console.log(e);
            return {
                data: null,
                success: false,
                status: 500
            }
        }
    }
}
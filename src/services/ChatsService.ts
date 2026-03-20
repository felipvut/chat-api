import { ServiceResponse } from "../../types/ServiceResponse";
import AppDataSource from "../database";
import Chat from "../entities/Chat";
import { DefaultService } from "./DefaultService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { UsersService } from "./UsersService";
import { PersonsService } from "./PersonsService";

export class ChatsService extends DefaultService {
    repository = AppDataSource.getRepository(Chat)

    async myChats(request: Request, response: Response): Promise<ServiceResponse> {
        try {
            const token = request.headers.authorization;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const personsService = new PersonsService();
            const person = await personsService.repository.findOne({
                where: {
                    users_uuid: decoded?.uuid
                }
            })

            if (!person) {
                return {
                    data: null,
                    status: 500,
                    success: false
                }
            }

            const chats: any[] = await this.repository.find({
                relations: ['author', 'contact'],
                where: [
                    { author_uuid: person?.uuid },
                    { contact_uuid: person?.uuid }
                ]
            });

            for (let chat of chats) {
                if (chat?.author?.uuid == person?.uuid) {
                    chat.name = chat?.contact?.name
                } else {
                    chat.name = chat?.author?.name
                }
            }
            return {
                data: chats,
                success: true,
                status: 200
            }
        } catch (e) {
            console.log(e)
            return {
                data: null,
                success: false,
                status: 500
            }
        }
    }
}
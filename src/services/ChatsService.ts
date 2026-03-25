import { ServiceResponse } from "../../types/ServiceResponse";
import AppDataSource from "../database";
import Chat from "../entities/Chat";
import { DefaultService } from "./DefaultService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { PersonsService } from "./PersonsService";
import { MessagesService } from "./MessagesService";
import Message from "../entities/Message";

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

    async getChat(request: Request, response: Response, uuid: string): Promise<ServiceResponse> {
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

            const chat: any = await this.repository.findOne({
                relations: ['author', 'contact'],
                where: {
                    uuid: uuid
                }
            });

            if (chat?.author?.uuid == person?.uuid) {
                chat.name = chat?.contact?.name
            } else {
                chat.name = chat?.author?.name
            }

            return {
                data: chat,
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

    async getMessages(request: Request, response: Response, uuid: string): Promise<ServiceResponse> {
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
            const messagesService = new MessagesService()
            const messages: any[] = await messagesService.repository.find({
                relations: ['author'],
                where: {
                    chats_uuid: uuid
                },
                order: {
                    created_at: "ASC"
                }
            });

            for (let message of messages) {
                if (message?.author?.uuid == person?.uuid) {
                    message.is_author = true
                } else {
                    message.is_author = false
                }
            }

            return {
                data: messages,
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


    async sendMessage(request: Request, response: Response, uuid: string): Promise<ServiceResponse> {
        try {
            const data = request.body;
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

            const messagesService = new MessagesService();

            const message = {
                created_at: new Date(),
                chats_uuid: uuid,
                message: data?.message,
                author_uuid: person?.uuid
            }

            const create = await messagesService.repository.save(message);

            return {
                data: create,
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

    async sendMessageSocket(token: string, data: any) {
        try {
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

            const allowChat: any[] = await this.repository.find({
                where: [
                    {
                        uuid: data?.chats_uuid,
                        author_uuid: person?.uuid
                    },
                    {
                        uuid: data?.chats_uuid,
                        contact_uuid: person?.uuid
                    }
                ]
            });

            if (allowChat?.length <= 0) {
                return {
                    data: null,
                    success: false,
                    message: "Unauthorized"
                }
            }

            const messagesService = new MessagesService();

            const message = {
                created_at: data?.created_at,
                chats_uuid: data?.chats_uuid,
                message: data?.message,
                author_uuid: person?.uuid
            }

            const create: any = await messagesService.repository.save(message);

            await this.repository.save({
                uuid: data?.chats_uuid,
                last_message: data?.message
            })

            if (create?.author_uuid == person?.uuid) {
                create.is_author = true
            } else {
                create.is_author = false
            }

            return {
                data: create,
                success: true,
            }
        } catch (e) {
            console.log(e)
            return {
                data: null,
                success: false,
            }
        }
    }

    async checkChat(token: string, uuid: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const personsService = new PersonsService();
        const person = await personsService.repository.findOne({
            where: {
                users_uuid: decoded?.uuid
            }
        })

        const allowChat = await this.repository.find({
            where: [
                {
                    uuid: uuid,
                    author_uuid: person?.uuid
                },
                {
                    uuid: uuid,
                    contact_uuid: person?.uuid
                }
            ]
        });

        if (allowChat?.length <= 0) {
            return false
        }

        return true
    }
}
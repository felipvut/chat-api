import { ServiceResponse } from "../../types/ServiceResponse";
import { DateUtilService } from "../../util/date";
import AppDataSource from "../database";
import Person from "../entities/Person";
import { DefaultService } from "./DefaultService";
import { Request } from "express";
import jwt from "jsonwebtoken"
import { ChatsService } from "./ChatsService";
import { In, Not } from "typeorm";

export class PersonsService extends DefaultService {
    repository = AppDataSource.getRepository(Person)

    async listPersons(): Promise<ServiceResponse> {
        try {
            const entities: any[] = await this.repository.find();

            return {
                data: entities,
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

    async listNewsChats(request: Request): Promise<ServiceResponse> {
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
            const chatsService = new ChatsService();
            const chats = await chatsService.repository.find({
                relations: ['author', 'contact'],
                where: [
                    { author_uuid: person?.uuid },
                    { contact_uuid: person?.uuid }
                ]
            });

            const persons_uuids = []

            for (const chat of chats) {
                if (chat.author_uuid == person?.uuid) {
                    persons_uuids.push(chat.contact_uuid)
                }
                if (chat.contact_uuid == person?.uuid) {
                    persons_uuids.push(chat.author_uuid)
                }
            }

            const entities = await this.repository.find({
                where: {
                    uuid: Not(In(persons_uuids))
                }
            });

            return {
                data: entities,
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
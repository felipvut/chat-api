import { ChatsService } from "../services/ChatsService";
import { DefaultController } from "./DefaultController"
import { Request, Response } from "express";

export class ChastsController extends DefaultController {
    service = new ChatsService()

    async myChats(request: Request, response: Response) {
        const entity = await this.service.myChats(request, response)
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                data: entity,
                success: true,
                message: entity.message || 'Objto retornado com sucesso'
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao processar requisição'
        })
    }

    async getChat(request: Request, response: Response, uuid: string) {
        const entity = await this.service.getChat(request, response, uuid)
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                data: entity.data,
                success: true,
                message: entity.message || 'Objto retornado com sucesso'
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao processar requisição'
        })
    }

    async getMessages(request: Request, response: Response, uuid: string) {
        const entity = await this.service.getMessages(request, response, uuid)
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                data: entity.data,
                success: true,
                message: entity.message || 'Objto retornado com sucesso'
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao processar requisição'
        })
    }

    async sendMessage(request: Request, response: Response, uuid: string) {
        const entity = await this.service.sendMessage(request, response, uuid)
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                data: entity.data,
                success: true,
                message: entity.message || 'Objto retornado com sucesso'
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao processar requisição'
        })
    }
}
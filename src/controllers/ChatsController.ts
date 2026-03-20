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

}
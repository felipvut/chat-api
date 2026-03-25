import { PersonsService } from "../services/PersonsService"
import { DefaultController } from "./DefaultController"
import { Request, Response } from "express";

export class PersonsController extends DefaultController {
    service = new PersonsService()

    async list(request: Request, response: Response) {
        const entity = await this.service.listPersons()
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

    async listNewsChats(request: Request, response: Response) {
        const entity = await this.service.listNewsChats(request)
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
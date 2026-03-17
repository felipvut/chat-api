import { Request, Response } from "express";
export class DefaultController {
    service = null;
    table = null

    async get(request: Request, response: Response, uuid: any) {
        const entity = await this.service.get(uuid)
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

    async list(request: Request, response: Response) {
        const entity = await this.service.list()
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

    async create(request: Request, response: Response) {
        const obj = request.body
        const entity = await this.service.create(obj)
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

    async update(request: Request, response: Response, uuid: any) {
        const obj = request.body
        const entity = await this.service.update(obj, uuid)
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

    async delete(request: Request, response: Response, uuid: any) {
        const entity = await this.service.delete(uuid)
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
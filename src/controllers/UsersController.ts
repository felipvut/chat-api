import { ServiceResponse } from "../../types/ServiceResponse";
import { UsersService } from "../services/UsersService"
import { DefaultController } from "./DefaultController"
import { Request, Response } from "express";

export class UsersController extends DefaultController {
    service = new UsersService()

    async login(request: Request, response: Response) {
        const body = request.body
        const entity = await this.service.login(body);
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                token: entity?.data,
                success: true,
                message: entity.message || 'Login realizado com sucesso'
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao realizar login'
        })
    }

    async register(request: Request, response: Response) {
        const body = request.body
        const entity = await this.service.register(body);
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                success: true,
                message: entity.message || 'Conta criada com sucesso'
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao criar conta'
        })
    }

    async me(request: Request, response: Response) {
        const entity = await this.service.me(request);
        if (entity.status >= 200 && entity.status < 300) {
            return response.status(entity.status).send({
                data: entity?.data,
                success: true,
                message: entity.message
            })
        }

        return response.status(entity.status).send({
            success: false,
            message: entity.message || 'Erro ao buscar usuário'
        })
    }
}
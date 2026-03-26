import { FilesService } from "../services/FilesService";
import { DefaultController } from "./DefaultController"
import { Request, Response } from "express";

export class FilesController extends DefaultController {
    service = new FilesService()

    async getFile(request: Request, response: Response, uuid: string) {
        const entity = await this.service.getFile(uuid);
        if (entity) {
            response.setHeader('Content-Type', entity.mimetype)
            response.setHeader('Content-Disposition', 'inline;')
            return response.status(200).send(entity.data)
        }

        return response.status(404).send({
            success: false,
            message: 'Erro ao buscar arquivo'
        })
    }
}
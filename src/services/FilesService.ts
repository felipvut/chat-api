import { randomUUID } from "crypto";
import AppDataSource from "../database";
import File from "../entities/File";

export class FilesService {
    repo = AppDataSource.getRepository(File)

    async list() {
        return await this.repo.find()
    }

    async create(req: any) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const uuid = randomUUID()
        return await this.repo.save({
            uuid: uuid,
            data: req.file.buffer,
            name: uniqueName,
            mimetype: req.file.mimetype
        })
    }
}
import AppDataSource from "../database";
import File from "../entities/File";

export class FilesService {
    repository = AppDataSource.getRepository(File)

    async list() {
        return await this.repository.find()
    }

    async getFile(uuid: string) {

        return await this.repository.findOne({
            where: {
                uuid: uuid
            }
        })
    }

    async create(body: any) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return await this.repository.save({
            data: body.data,
            name: uniqueName,
            mimetype: body.mimetype
        })
    }
}
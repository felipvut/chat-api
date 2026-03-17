import { ServiceResponse } from "../../types/ServiceResponse";

export class DefaultService {
    repository: any;

    async get(uuid: any): Promise<ServiceResponse> {
        try {
            const data = await this.repository.find({
                where: {
                    uuid: uuid
                }
            })
            return {
                data,
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

    async list(): Promise<ServiceResponse> {
        try {
            const data = await this.repository.find();
            return {
                data,
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

    async create(obj: any): Promise<ServiceResponse> {
        try {
            const createdValue = await this.repository.save(obj)
            return {
                data: createdValue,
                success: true,
                status: 201
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

    async update(obj: any, uuid: any): Promise<ServiceResponse> {
        try {
            const data = await this.repository.update({ uuid: uuid }, obj)
            return {
                data,
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

    async delete(uuid: any): Promise<ServiceResponse> {
        try {
            const data = await this.repository.delete({ uuid: uuid });

            return {
                data,
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
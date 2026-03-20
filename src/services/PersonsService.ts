import { ServiceResponse } from "../../types/ServiceResponse";
import { DateUtilService } from "../../util/date";
import AppDataSource from "../database";
import Person from "../entities/Person";
import { DefaultService } from "./DefaultService";

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
}
import AppDataSource from "../database";
import Message from "../entities/Message";
import { DefaultService } from "./DefaultService";

export class MessagesService extends DefaultService {
    repository = AppDataSource.getRepository(Message)

}
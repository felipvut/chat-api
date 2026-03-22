import { MessagesService } from "../services/MessagesService";
import { DefaultController } from "./DefaultController"

export class MessagesController extends DefaultController {
    service = new MessagesService()

}
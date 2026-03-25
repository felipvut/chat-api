import { Router } from "express";
import { PersonsController } from "./controllers/PersonsController";
import { UsersController } from "./controllers/UsersController";
import { ChastsController } from "./controllers/ChatsController";

const routes = Router()

const controllers = {
    persons: {
        controller: new PersonsController()
    },
    users: {
        controller: new UsersController()
    },
}

routes.get('/me', async (req, res) => {
    const controller = new UsersController()
    return await controller.me(req, res)
})

routes.post('/register', async (req, res) => {
    const controller = new UsersController()
    return await controller.register(req, res)
})

routes.post('/login', async (req, res) => {
    const controller = new UsersController()
    return await controller.login(req, res)
})

routes.get('/objeto/:entity', async (req, res) => {
    const { entity } = req.params
    if (!controllers[entity]) {
        return res.status(404).send({
            success: false,
            message: 'Entidade não encontrada'
        });
    }

    const controller = controllers[entity].controller;

    return await controller.list(req, res);
})

routes.get('/objeto/:entity/:uuid', async (req, res) => {
    const { entity, uuid } = req.params
    if (!controllers[entity]) {
        return res.status(404).send({
            success: false,
            message: 'Entidade não encontrada'
        });
    }
    const controller = controllers[entity].controller;
    return await controller.get(req, res, uuid)
})

routes.post('/objeto/:entity', async (req, res) => {
    const { entity } = req.params;
    if (!controllers[entity]) {
        return res.status(404).send({
            success: false,
            message: 'Entidade não encontrada'
        });
    }
    const controller = controllers[entity].controller
    return await controller.create(req, res)
})

routes.put('/objeto/:entity/:uuid', async (req, res) => {
    const { entity, uuid } = req.params;
    if (!controllers[entity]) {
        return res.status(404).send({
            success: false,
            message: 'Entidade não encontrada'
        });
    }
    const controller = controllers[entity].controller
    return await controller.update(req, res, uuid)
})

routes.delete('/objeto/:entity/:uuid', async (req, res) => {
    const { entity, uuid } = req.params;
    if (!controllers[entity]) {
        return res.status(404).send({
            success: false,
            message: 'Entidade não encontrada'
        });
    }
    const controller = controllers[entity].controller
    return await controller.delete(req, res, uuid)
})

routes.get('/my-chats', async (req, res) => {
    const controller = new ChastsController();
    return await controller.myChats(req, res)
})

routes.get('/news-chats', async (req, res) => {
    const controller = new PersonsController();
    return await controller.listNewsChats(req, res)
})

routes.get('/get-chat/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const controller = new ChastsController();
    return await controller.getChat(req, res, uuid)
})

routes.get('/messages/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const controller = new ChastsController();
    return await controller.getMessages(req, res, uuid)
})

routes.post('/messages/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const controller = new ChastsController();
    return await controller.sendMessage(req, res, uuid)
})

routes.post('/new-chat', async (req, res) => {
    const controller = new ChastsController();
    return await controller.newChat(req, res)
})

export default routes;
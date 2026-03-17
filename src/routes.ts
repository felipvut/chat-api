import { Router } from "express";
import { PersonsController } from "./controllers/PersonsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router()

const controllers = {
    persons: {
        controller: new PersonsController()
    },
    users: {
        controller: new UsersController()
    },
}

routes.post('/register', async (req, res) => {
    const controller = new UsersController()
    return await controller.register(req, res)
})

routes.post('/login', async (req, res) => {
    const controller = new UsersController()
    return await controller.login(req, res)
})

routes.get('/:entity', async (req, res) => {
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

routes.get('/:entity/:uuid', async (req, res) => {
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

routes.post('/:entity', async (req, res) => {
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

routes.put('/:entity/:uuid', async (req, res) => {
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

routes.delete('/:entity/:uuid', async (req, res) => {
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

export default routes;
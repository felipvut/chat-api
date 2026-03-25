import "reflect-metadata";

import express from "express";
import cors from 'cors';
import "./database/index";
import AppDataSource from "./database/index";
import routes from "./routes";
import http from 'http';
import jwt from "jsonwebtoken"
import { Server } from 'socket.io';
import { ChatsService } from "./services/ChatsService";

const app = express()
const port = 5000

const server = http.createServer(app);
const chatsService = new ChatsService();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        next(new Error("Not Authorized"));
    }

});

io.on('connection', async (socket) => {
    console.log('Usuário conectado');
    const token = socket.handshake.auth.token;
    const chat = socket.handshake.auth.chat;
    if (chat) {
        const authorized = await chatsService.checkChat(token, chat);
        if (authorized) {
            socket.join(chat);
        }
    }

    socket.on('send_message', async (data) => {
        const dbMessage = await chatsService.sendMessageSocket(socket.handshake.auth.token, data);
        if (dbMessage?.success) {
            io.to(dbMessage?.data?.chats_uuid).emit('receive_message', dbMessage?.data)
        }
    });
});

AppDataSource.initialize().then(() => {
    server.listen(port, () => {
        console.log("API rodando na porta " + port)
    })
}).catch((e) => {
    console.log(e)
})

app.use(cors())

app.use(express.json())

app.use(async (req, res, next) => {
    const urlsAutorizadas = ['/login', '/register']

    if (req.method == 'GET') {
        next()
        return
    }

    if (urlsAutorizadas?.indexOf(req.url) >= 0) {
        next();
        return
    }

    await jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, decoded) {
        if (decoded) {
            next();
            return
        }
        return res.status(401).end()
    });

})

app.use(routes)



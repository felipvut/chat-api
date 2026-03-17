import "reflect-metadata";

import express from "express";
import cors from 'cors';
import "./database/index";
import AppDataSource from "./database/index";
import routes from "./routes";
import jwt from "jsonwebtoken"

const app = express()
const port = 3000

AppDataSource.initialize().then(() => {
    app.listen(port, () => {
        console.log("API rodando na porta " + port)
    })
}).catch((e) => {
    console.log(e)
})

app.use(cors())

app.use(express.json())

app.use(async (req, res, next) => {
    const urlsAutorizadas = ['/login', '/register']

    if (urlsAutorizadas?.indexOf(req.url) >= 0) {
        next();
        return
    }
    if (req.method == 'GET') {
        next();
        return;
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



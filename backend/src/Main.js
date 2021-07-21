import { config } from "dotenv";
config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import SocketHandler from "./socket/SocketHandler.js";
import HttpHandler from "./http/HttpHandler.js";
import Database from "./database/Database.js";
import MercadoLivreFetch from "./mercadolivre/MercadoLivreFetch.js";
class Main {
    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer);
        this.socketHandler = null;
        this.httpHandler = null;
        this.database = new Database();

        this.initApplication();
        this.mercadoLivreFetcher = new MercadoLivreFetch();
    }

    async initApplication() {
        if (!(await this.database.initDatabase())) {
            console.log("Database cannot be initialized, stoping application!");
            return;
        }

        this.httpServer.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port: ${process.env.SERVER_PORT}`));
        this.app.use(express.json());
        this.socketHandler = new SocketHandler(this.io);
        this.httpHandler = new HttpHandler(this.app);

        // this.mercadoLivreFetcher.categoryRequestModule.updateCategoriesInDatabase();
    }
}

global.instance = new Main();

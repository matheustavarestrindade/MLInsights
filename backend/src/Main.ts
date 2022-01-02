import { config } from "dotenv";
config();
import express, { Express } from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import SocketHandler from "./socket/SocketHandler";
import HttpHandler from "./http/HttpHandler";
import Database from "./database/Database";
import Log from "./log/LogUtils";

class Main {
    express_app: Express;
    http_server: http.Server;
    socket_io: SocketServer;
    http_handler: HttpHandler;
    database: Database;
    socket_handler: SocketHandler;

    constructor() {
        this.express_app = express();
        this.http_server = http.createServer(this.express_app);
        this.socket_io = new SocketServer(this.http_server);
        this.socket_handler = null;
        this.http_handler = null;
        this.database = new Database();

        this.initApplication();
    }

    async initApplication() {
        if (!(await this.database.initDatabase())) {
            Log.error({ message: "Database cannot be initialized", params: "stoping application!" });
            return;
        }

        this.http_server.listen(process.env.SERVER_PORT, () => Log.info({ message: "Server listening on port ", params: `${process.env.SERVER_PORT}` }));
        this.express_app.use(express.json());
        this.socket_handler = new SocketHandler(this.socket_io);
        this.http_handler = new HttpHandler(this.express_app);
    }
}

global.instance = new Main();

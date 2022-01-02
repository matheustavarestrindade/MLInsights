import { Server as SocketServer } from "socket.io";

export default class SocketHandler {
    socket_io: SocketServer;
    constructor(socket_io: SocketServer) {
        this.socket_io = socket_io;
        this.registerRoutes();
    }

    registerRoutes() {}
}

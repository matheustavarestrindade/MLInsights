export default class HttpHandler {
    constructor(expressApp) {
        this.app = expressApp;
        this.registerRoutes();
    }

    registerRoutes() {}
}

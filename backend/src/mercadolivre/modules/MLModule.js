export default class MLModule {
    constructor(baseURL) {
        this.BASE_URL = baseURL;
    }

    formatURL(params) {
        let finalURL = this.BASE_URL;
        for (let i = 0; i < params.length; i++) {
            finalURL = finalURL.replace("$" + i, params[i]);
        }
        return finalURL;
    }
}

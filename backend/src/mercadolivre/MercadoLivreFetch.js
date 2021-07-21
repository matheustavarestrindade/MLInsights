import MLCategoryRequestModule from "./modules/MLCategoryRequestModule.js";

export default class MercadoLivreFetch {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.categoryRequestModule = new MLCategoryRequestModule();
    }
}

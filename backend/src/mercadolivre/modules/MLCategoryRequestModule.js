import MLModule from "./MLModule.js";
import fetch from "node-fetch";
import zlib from "zlib";
import MLCategoryModel from "../../database/models/MLCategoryModel.js";
import MLSubCategoryModel from "../../database/models/MLSubCategoryModel.js";

export default class MLCategoryRequestModule extends MLModule {
    constructor() {
        super("https://api.mercadolibre.com/sites/$0/categories/all");
    }

    async updateCategoriesInDatabase() {
        const data = await fetch(this.formatURL(["MLB"]));
        const receivedCategories = await data.json();

        for (const key of Object.keys(receivedCategories)) {
            const category = receivedCategories[key];
            await MLCategoryModel.upsert({
                id: category.id,
                name: category.name,
                url: category.permalink,
                image_url: category.picture,
                total_items: Number(category.total_items_in_this_category),
            });
            for (const children of category.children_categories) {
                await MLSubCategoryModel.upsert({
                    id: children.id,
                    name: children.name,
                    total_items: children.total_items_in_this_category,
                    MLCategoryModelId: category.id,
                });
            }
        }
    }
}

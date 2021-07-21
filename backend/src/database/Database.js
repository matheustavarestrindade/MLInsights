import Sequelize from "sequelize";
import UserModel, { initUserModel } from "./models/UserModel.js";
import MLSubCategoryModel, { initMLSubCategoryModel } from "./models/MLSubCategoryModel.js";
import MLCategoryModel, { initMLCategoryModel } from "./models/MLCategoryModel.js";

export default class Database {
    constructor() {
        this.connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            dialect: "mysql",
            logging: false,
        });
    }

    async initDatabase() {
        if (!(await this.checkConnection())) {
            return false;
        }

        initUserModel(this.connection);
        initMLCategoryModel(this.connection);
        initMLSubCategoryModel(this.connection);

        await this.createTablesAndAssociations();

        return true;
    }

    async createTablesAndAssociations() {
        await UserModel.sync();

        MLCategoryModel.hasMany(MLSubCategoryModel);
        MLSubCategoryModel.belongsTo(MLCategoryModel);

        await MLCategoryModel.sync();
        await MLSubCategoryModel.sync();
    }

    async checkConnection() {
        try {
            await this.connection.authenticate();
            console.log("Connection has been established successfully.");
            return true;
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
        return false;
    }
}

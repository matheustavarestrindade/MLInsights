import { Sequelize } from "sequelize";
import LogUtils from "../log/LogUtils";
import CompanyClientBlockedByClientModel, { initCompanyClientBlockedByClientModel } from "./models/Company/Clients/CompanyClientBlockedByClientModel";
import CompanyClientMarkedScheduleModel, { initCompanyClientMarkedScheduleModel } from "./models/Company/Clients/CompanyClientMarkedScheduleModel";
import CompanyClientModel, { initCompanyClientModel } from "./models/Company/Clients/CompanyClientModel";
import CompanyClientSessionNotesModel, { initCompanyClientSessionNotesModel } from "./models/Company/Clients/CompanyClientSessionNotesModel";
import CompanyClientSessionReceiptModel, { initCompanyClientSessionReceiptModel } from "./models/Company/Clients/CompanyClientSessionReceipt";
import CompanyInvoiceCollectionModel, { initCompanyInvoiceCollectionModel } from "./models/Company/CompanyInvoiceCollectionModel";
import CompanyModel, { initCompanyModel } from "./models/Company/CompanyModel";
import CompanyPaymentGatewaysModel, { initCompanyPaymentGatewaysModel } from "./models/Company/CompanyPaymentGatewaysModel";
import CompanyPaymentPricesModel, { initCompanyPaymentPricesModel } from "./models/Company/CompanyPaymentPricesModel";
import CompanyEmployeeModel, { initCompanyEmployeeModel } from "./models/Company/Employees/CompanyEmployeeModel";
import CompanyEmployeeScheduleModel, { initCompanyEmployeeScheduleModel } from "./models/Company/Employees/CompanyEmployeeScheduleModel";
export default class Database {
    sequelize_connection: Sequelize;

    constructor() {
        this.sequelize_connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            dialect: "mysql",
            logging: false,
        });
    }

    async initDatabase() {
        if (!(await this.checkConnection())) {
            return false;
        }

        LogUtils.info({ message: "Initializing", params: "Database models" });
        await this.initModel(initCompanyModel);
        await this.initModel(initCompanyPaymentGatewaysModel);
        await this.initModel(initCompanyPaymentPricesModel);
        await this.initModel(initCompanyInvoiceCollectionModel);
        await this.initModel(initCompanyClientModel);
        await this.initModel(initCompanyClientSessionNotesModel);
        await this.initModel(initCompanyClientBlockedByClientModel);
        await this.initModel(initCompanyEmployeeModel);
        await this.initModel(initCompanyEmployeeScheduleModel);
        await this.initModel(initCompanyClientMarkedScheduleModel);
        await this.initModel(initCompanyClientSessionReceiptModel);

        await this.createTablesAndAssociations();

        return true;
    }

    async createTablesAndAssociations() {
        LogUtils.info({ message: "Initializing", params: "Database tables" });

        await CompanyModel.sync();
        await CompanyPaymentGatewaysModel.sync();
        await CompanyPaymentPricesModel.sync();
        await CompanyInvoiceCollectionModel.sync();
        await CompanyClientModel.sync();
        await CompanyClientSessionNotesModel.sync();
        await CompanyClientBlockedByClientModel.sync();
        await CompanyEmployeeModel.sync();
        await CompanyEmployeeScheduleModel.sync();
        await CompanyClientMarkedScheduleModel.sync();
        await CompanyClientSessionReceiptModel.sync();
    }

    private async initModel(initFunction: Function) {
        const modelName = initFunction.name.replace("init", "");
        LogUtils.subInfo({ message: "Initializing", params: modelName });
        try {
            await initFunction(this.sequelize_connection);
        } catch (err) {
            LogUtils.error({ message: "Error when initializing model", params: modelName });
        }
    }

    protected async checkConnection() {
        try {
            await this.sequelize_connection.authenticate();
            LogUtils.info({
                message: "Connection to the database has been stablished",
                params: "successfully",
            });
            return true;
        } catch (error) {
            LogUtils.error({
                message: "Unable to connect to the database",
                params: error,
            });
        }
        return false;
    }
}

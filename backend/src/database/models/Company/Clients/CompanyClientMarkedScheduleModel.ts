import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyModel from "../CompanyModel";
import CompanyPaymentPricesModel from "../CompanyPaymentPricesModel";
import CompanyEmployeeModel from "../Employees/CompanyEmployeeModel";
import CompanyEmployeeScheduleModel from "../Employees/CompanyEmployeeScheduleModel";
import CompanyClientModel from "./CompanyClientModel";
import CompanyClientSessionReceiptModel from "./CompanyClientSessionReceipt";

const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyClientMarkedScheduleModel extends Model {
    public id!: number;
    public client_id!: number;
    public employee_id!: number;
    public employee_schedule_id!: number;

    public company_payment_price!: number;
    public session_completed!: boolean;
    public session_cancelled_by!: number;
    public session_cancelled_descrioption!: string;
    public session_payed!: boolean;

    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyClientMarkedScheduleModel;

export const initCompanyClientMarkedScheduleModel = (connection: Sequelize) => {
    CompanyClientMarkedScheduleModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            client_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: CompanyClientModel,
                    key: "id",
                },
            },
            employee_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: CompanyClientModel,
                    key: "id",
                },
            },
            employee_schedule_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: CompanyEmployeeScheduleModel,
                    key: "id",
                },
            },
            company_payment_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: CompanyPaymentPricesModel,
                    key: "id",
                },
            },
            session_completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
            session_cancelled_by: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: CompanyEmployeeModel,
                    key: "id",
                },
            },
            session_cancelled_description: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            session_payed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize: connection,
            tableName: "company_client_marked_schedule",
        }
    );
};

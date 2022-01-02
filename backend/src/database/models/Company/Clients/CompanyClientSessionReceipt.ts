import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyPaymentGatewaysModel from "../CompanyPaymentGatewaysModel";
import CompanyClientMarkedScheduleModel from "./CompanyClientMarkedScheduleModel";
import CompanyClientModel from "./CompanyClientModel";

class CompanyClientSessionReceiptModel extends Model {
    public marked_schedule_id!: number;
    public client_id!: number;
    public payment_method!: string;
    public payment_receipt_link!: string;
    public value!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyClientSessionReceiptModel;

export const initCompanyClientSessionReceiptModel = async (connection: Sequelize) => {
    CompanyClientSessionReceiptModel.init(
        {
            marked_schedule_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                references: {
                    model: CompanyClientMarkedScheduleModel,
                    key: "id",
                },
            },
            client_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    key: "id",
                    model: CompanyClientModel,
                },
                allowNull: false,
            },

            payment_method: {
                type: DataTypes.ENUM("PAYPAL", "PAGSEGURO", "MERCADOPAGO"),
                allowNull: false,
                references: {
                    key: "name",
                    model: CompanyPaymentGatewaysModel,
                },
            },
            payment_link: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            value: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
        },
        {
            sequelize: connection,
            tableName: "company_client_session_receipt",
        }
    );
};

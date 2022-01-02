import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyPaymentGatewaysModel from "./CompanyPaymentGatewaysModel";

class CompanyPaymentPricesModel extends Model {
    public id!: number;
    public payment_method_name!: string;
    public payment_name!: string;
    public price!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyPaymentPricesModel;

export const initCompanyPaymentPricesModel = (connection: Sequelize) => {
    CompanyPaymentPricesModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            payment_method_name: {
                type: DataTypes.ENUM("PAYPAL", "PAGSEGURO", "MERCADOPAGO"),
                allowNull: false,
                references: {
                    model: CompanyPaymentGatewaysModel,
                    key: "name",
                },
            },
            payment_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
        },
        {
            sequelize: connection,
            tableName: "company_payment_prices",
        }
    );
};

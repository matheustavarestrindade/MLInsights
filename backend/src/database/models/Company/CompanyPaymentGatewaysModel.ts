import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyModel from "./CompanyModel";

const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyPaymentGatewaysModel extends Model {
    public name!: string;
    public company_cpf_cnpj!: number;
    public private_key!: string;
    public public_key!: string;
    public payment_configuration!: any;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyPaymentGatewaysModel;

export const initCompanyPaymentGatewaysModel = (connection: Sequelize) => {
    CompanyPaymentGatewaysModel.init(
        {
            name: {
                type: DataTypes.ENUM("PAYPAL", "PAGSEGURO", "MERCADOPAGO"),
                allowNull: false,
                primaryKey: true,
            },
            company_cpf_cnpj: {
                type: DataTypes.DOUBLE,
                primaryKey: true,
                allowNull: false,
                validate: {
                    is: cpfRegex,
                },
                references: {
                    model: CompanyModel,
                    key: "cpf_cnpj",
                },
            },
            private_key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            public_key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            payment_configuration: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: {},
            },
        },
        {
            sequelize: connection,
            tableName: "company_payment_gateways",
        }
    );
};

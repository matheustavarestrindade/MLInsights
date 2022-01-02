import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyModel from "./CompanyModel";

const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyInvoiceCollectionModel extends Model {
    public company_cpf_cnpj!: number;
    public value!: number;
    public due_date!: Date;
    public is_payed!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyInvoiceCollectionModel;

export const initCompanyInvoiceCollectionModel = (connection: Sequelize) => {
    CompanyInvoiceCollectionModel.init(
        {
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
            value: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            is_payed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize: connection,
            tableName: "company_invoice_collection",
        }
    );
};

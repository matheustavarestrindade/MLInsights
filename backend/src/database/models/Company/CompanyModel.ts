import { Model, DataTypes, Sequelize } from "sequelize";
import { CountriesCodeList, CountriesEnum } from "../../utils/AddressUtils";
import CompanyInvoiceCollectionModel from "./CompanyInvoiceCollectionModel";
import CompanyEmployeeModel from "./Employees/CompanyEmployeeModel";

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /\(?\+?[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?/;
const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyModel extends Model {
    public cpf_cnpj!: number;
    public name!: string;
    public phone!: string;
    public email!: string;
    public address_zip!: string;
    public address_street!: string;
    public address_neighborhood!: string;
    public address_number!: string;
    public address_country!: string;
    public address_state!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static async registerNewCompany(company_info: any): Promise<boolean> {
        const {
            company_name,
            cpf_cnpj,
            first_name,
            last_name,
            email,
            phone,
            password,
            address_zip,
            address_street,
            address_neighborhood,
            address_number,
            address_country,
            address_city,
            address_state,
            birthday,
            role,
        } = company_info;

        const companyResult = await CompanyModel.create({
            cpf_cnpj,
            name: company_name,
            phone,
            email,
            address_zip,
            address_street,
            address_neighborhood,
            address_number,
            address_city,
            address_country,
            address_state,
        });

        if (!companyResult) {
            return false;
        }

        const employeeResult = await CompanyEmployeeModel.create({
            cpf_cnpj,
            company_cpf_cnpj: cpf_cnpj,
            first_name,
            last_name,
            email,
            phone,
            password,
            address_zip,
            address_street,
            address_neighborhood,
            address_number,
            address_country,
            address_city,
            address_state,
            birthday,
            role,
        });

        if (!employeeResult) {
            return false;
        }

        const companyFirstBilling = await CompanyInvoiceCollectionModel.create({
            company_cpf_cnpj: cpf_cnpj,
            value: 0,
            due_date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30),
            is_payed: true,
        });
        if (!companyFirstBilling) {
            return false;
        }
        return true;
    }
}

export default CompanyModel;

export const initCompanyModel = (connection: Sequelize) => {
    CompanyModel.init(
        {
            cpf_cnpj: {
                type: DataTypes.DOUBLE,
                unique: true,
                primaryKey: true,
                allowNull: false,
                validate: {
                    is: cpfRegex,
                },
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    is: phoneRegex,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                    is: emailRegex,
                },
            },
            address_zip: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address_street: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_neighborhood: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_country: {
                type: CountriesEnum,
                allowNull: false,
                validate: {
                    isIn: {
                        args: [CountriesCodeList],
                        msg: "Invalid country",
                    },
                },
            },
            address_city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address_state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize: connection,
            tableName: "company",
        }
    );
};

import { Model, DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import CompanyModel from "../CompanyModel";
import { CountriesCodeList, CountriesEnum } from "../../../utils/AddressUtils";

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /\(?\+?[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?/;
const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyClientModel extends Model {
    public id!: number;
    public company_cpf_cnpj!: number;
    public cpf_cnpj!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public address_zip!: string;
    public address_street!: string;
    public address_neighborhood!: string;
    public address_number!: string;
    public address_country!: string;
    public address_state!: string;
    public birthday!: Date;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyClientModel;

export const initCompanyClientModel = (connection: Sequelize) => {
    CompanyClientModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
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
            cpf_cnpj: {
                type: DataTypes.DOUBLE,
                unique: true,
                primaryKey: true,
                allowNull: false,
                validate: {
                    is: cpfRegex,
                },
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                    is: emailRegex,
                },
            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    is: phoneRegex,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
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
            birthday: {
                type: DataTypes.DATE,
                validate: {
                    isDate: true,
                },
            },
        },
        {
            sequelize: connection,
            tableName: "company_client",
            hooks: {
                async beforeCreate(user) {
                    user.email = user.email.toLowerCase();
                    const saltRounds = 10;
                    user.password = await bcrypt.hash(user.password, saltRounds);
                },
            },
        }
    );
};

import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyClientsModel from "../Clients/CompanyClientModel";
import CompanyEmployeeModel from "./CompanyEmployeeModel";

const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyEmployeeScheduleModel extends Model {
    public id!: number;
    public employee_id!: number;
    public client_id!: number;
    public day_of_the_week!: number;
    public start_time!: Date;
    public end_time!: Date;
    public allow_holliday!: boolean;
    public is_presential!: boolean;
    public is_custom!: boolean;
    public accepted!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyEmployeeScheduleModel;

export const initCompanyEmployeeScheduleModel = (connection: Sequelize) => {
    CompanyEmployeeScheduleModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            employee_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: CompanyEmployeeModel,
                    key: "id",
                },
            },
            client_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: CompanyClientsModel,
                    key: "id",
                },
            },
            day_of_the_week: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            start_time: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            end_time: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            allow_holliday: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
            is_presential: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1,
            },
            accepted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
            is_custom: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize: connection,
            tableName: "company_employee_schedule",
        }
    );
};

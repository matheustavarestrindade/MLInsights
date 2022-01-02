import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyClientModel from "./CompanyClientModel";

const cpfRegex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

class CompanyClientSessionNotesModel extends Model {
    public client_id!: number;
    public note!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyClientSessionNotesModel;

export const initCompanyClientSessionNotesModel = (connection: Sequelize) => {
    CompanyClientSessionNotesModel.init(
        {
            client_id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                allowNull: false,
                validate: {
                    is: cpfRegex,
                },
                references: {
                    model: CompanyClientModel,
                    key: "id",
                },
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize: connection,
            tableName: "company_client_session_notes",
        }
    );
};

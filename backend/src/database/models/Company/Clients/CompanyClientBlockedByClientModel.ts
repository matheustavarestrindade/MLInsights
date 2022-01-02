import { Model, DataTypes, Sequelize } from "sequelize";
import CompanyModel from "../CompanyModel";
import CompanyClientModel from "./CompanyClientModel";

class CompanyClientBlockedByClientModel extends Model {
    public client_id!: number;
    public client_blocked_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default CompanyClientBlockedByClientModel;

export const initCompanyClientBlockedByClientModel = async (connection: Sequelize) => {
    CompanyClientBlockedByClientModel.init(
        {
            client_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    key: "id",
                    model: CompanyClientModel,
                },
                allowNull: false,
            },
            client_blocked_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    key: "id",
                    model: CompanyClientModel,
                },
                allowNull: false,
            },
        },
        {
            sequelize: connection,
            tableName: "company_client_blocked_user",
        }
    );
};

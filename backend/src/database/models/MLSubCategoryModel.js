import Sequelize from "sequelize";
const { Model, DataTypes } = Sequelize;

class MLSubCategoryModel extends Model {}

export default MLSubCategoryModel;

export const initMLSubCategoryModel = (connection) => {
    MLSubCategoryModel.init(
        {
            id: {
                type: DataTypes.STRING,
                unique: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            total_items: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize: connection,
            tableName: "ml_sub_categories",
        }
    );
};

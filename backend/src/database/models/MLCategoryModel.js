import Sequelize from "sequelize";
const { Model, DataTypes } = Sequelize;

class MLCategoryModel extends Model {}

export default MLCategoryModel;

export const initMLCategoryModel = (connection) => {
    MLCategoryModel.init(
        {
            id: {
                type: DataTypes.STRING,
                unique: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            url: {
                type: DataTypes.STRING,
            },
            image_url: {
                type: DataTypes.STRING,
            },
            total_items: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize: connection,
            tableName: "ml_categories",
        }
    );
};

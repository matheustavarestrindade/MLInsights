import Sequelize from "sequelize";
const { Model, DataTypes } = Sequelize;
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?/;

class UserModel extends Model {}

export default UserModel;

export const initUserModel = (connection) => {
    UserModel.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                primaryKey: true,
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
        },
        {
            sequelize: connection,
            tableName: "users",
            hooks: {
                beforeCreate(user) {
                    user.email = user.email.toLowerCase();
                    return user;
                },
            },
        }
    );
};

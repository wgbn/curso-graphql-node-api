import * as Sequelize from "sequelize";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { IBaseModel } from "../interfaces/base-model.interface";
import { IModels } from "../interfaces/models.interface";

export interface IUserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserInstance extends Sequelize.Instance<IUserAttributes>, IUserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface IUserModel extends IBaseModel, Sequelize.Model<IUserInstance, IUserAttributes> { }

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): IUserModel => {
    const user: IUserModel = sequelize.define('User', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: dataTypes.BLOB({ length: 'long' }),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'graph_user',
        hooks: {
            beforeCreate: (user: IUserInstance, options: Sequelize.CreateOptions) => {
                const salt = genSaltSync();
                user.password = hashSync(user. password, salt);
            }
        }
    });

    // user.associate = (models: IModels) => {}; 

    user.prototype.isPassword = (encodedPassword: string, password: string): boolean => compareSync(password, encodedPassword);

    return user;
};
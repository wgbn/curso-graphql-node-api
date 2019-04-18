import * as Sequelize from "sequelize";
import { IBaseModel } from "../interfaces/base-model.interface";
import { IModels } from "../interfaces/models.interface";

export interface IPostAttributes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPostInstance extends Sequelize.Instance<IPostAttributes> {}

export interface IPostModel extends IBaseModel, Sequelize.Model<IPostInstance, IPostAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): IPostModel => {
    const post: IPostModel = sequelize.define('Post', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: dataTypes.BLOB({ length: 'long' }),
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'graph_post'
    });

    post.associate = (models): void => {
        post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    }; 

    return post;
};
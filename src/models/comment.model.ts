import * as Sequelize from "sequelize";
import { IBaseModel } from "../interfaces/base-model.interface";
import { IModels } from "../interfaces/models.interface";

export interface ICommentAttributes {
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICommentInstance extends Sequelize.Instance<ICommentAttributes> {}

export interface ICommentModel extends IBaseModel, Sequelize.Model<ICommentInstance, ICommentAttributes> {}

export default (sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): ICommentModel => {
    const comm: ICommentModel = sequelize.define('Comment', {
        id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: dataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'graph_comment'
    });

    comm.associate = (models): void => {
        comm.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });
        comm.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    }; 

    return comm;
};
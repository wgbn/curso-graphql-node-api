"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = (sequelize, dataTypes) => {
    const user = sequelize.define('User', {
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
            beforeCreate: (user, options) => {
                const salt = bcryptjs_1.genSaltSync();
                user.password = bcryptjs_1.hashSync(user.password, salt);
            }
        }
    });
    // user.associate = (models: IModels) => {}; 
    user.prototype.isPassword = (encodedPassword, password) => bcryptjs_1.compareSync(password, encodedPassword);
    return user;
};

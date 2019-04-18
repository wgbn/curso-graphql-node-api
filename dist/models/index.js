"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
//console.log(config);
let db = null;
if (!db) {
    db = {};
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    const filesList = fs.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');
    for (let file of filesList) {
        const model = sequelize.import(path.join(__dirname, file));
        db[model['name']] = model;
    }
    for (let modelName in db) {
        if (db[modelName].hasOwnProperty('associate')) {
            db[modelName].associate(db);
        }
    }
    db['sequelize'] = sequelize;
}
exports.default = db;

import * as Sequelize from "sequelize";
import { IModels } from "./models.interface";

export interface IDBConnection extends IModels {

    sequelize: Sequelize.Sequelize;

}
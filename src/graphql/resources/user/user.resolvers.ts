import {GraphQLResolveInfo} from "graphql";
import {IDBConnection} from "../../../interfaces/db-connection.interface";
import {IUserInstance} from "../../../models/user.model";
import {Transaction} from "sequelize";
import {handleError} from "../../../utils/utils";

export const userResolvers = {

    User: {
        posts: (user, {first = 10, offset = 0}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                where:{ author: +user.get('id')},
                limit: first,
                offset: offset
            }).catch(handleError);
        }
    },

    Query: {
        users: (parent, {first = 10, offset = 0}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.User.findAll({limit: first, offset: offset}).catch(handleError);
        },
        user: (parent, {id}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.User.findById(+id).then((user: IUserInstance) => {
                if (!user) throw new Error(`User with id ${id} not found`);
                return user;
            }).catch(handleError);
        }
    },

    Mutation: {
        createUser: (parent, {input}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction( (t: Transaction) => {
                return db.User.create(input, { transaction: t });
            }).catch(handleError);
        },

        updateUser: (parent, {id, input}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction( (t: Transaction) => {
                return db.User.findById(+id).then( (user: IUserInstance) => {
                    if (!user) throw new Error(`User with id ${id} not found`);
                    return user.update(input, {transaction: t});
                });
            }).catch(handleError);
        },

        updateUserPassword: (parent, {id, input}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction( (t: Transaction) => {
                return db.User.findById(+id).then( (user: IUserInstance) => {
                    if (!user) throw new Error(`User with id ${id} not found`);
                    return user.update(input, {transaction: t}).then( (u: IUserInstance) =>  !!u);
                });
            }).catch(handleError);
        },

        deleteUser: (parent, {id}, {db}: {db: IDBConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction( (t: Transaction) => {
                return db.User.findById(+id).then( (user: IUserInstance) => {
                    if (!user) throw new Error(`User with id ${id} not found`);
                    return user.destroy({transaction: t}).then( u => !!u);
                });
            }).catch(handleError);
        },
    }

};

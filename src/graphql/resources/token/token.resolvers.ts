import { IDBConnection } from "../../../interfaces/db-connection.interface";
import { IUserInstance } from "../../../models/user.model";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../utils/utils";

export const tokenResolvers = {
    Mutation: {
        createToken: (parent, {email, password}, {db}:{db: IDBConnection}) => {
            return db.User.findOne({
                where: {email: email},
                attributes: ['id','password']
            }).then( (user: IUserInstance) => {
                let errorMessege = 'Não autorizado, email ou password está incorreto';
                if (!user || !user.isPassword(user.get('password'), password)) throw new Error(errorMessege);

                const payload = {sub: user.get('id')};

                return {
                    token: jwt.sign(payload, JWT_SECRET)
                }
            });
        } 
    }
};
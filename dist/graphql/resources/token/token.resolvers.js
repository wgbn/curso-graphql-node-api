"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const utils_1 = require("../../../utils/utils");
exports.tokenResolvers = {
    Mutation: {
        createToken: (parent, { email, password }, { db }) => {
            return db.User.findOne({
                where: { email: email },
                attributes: ['id', 'password']
            }).then((user) => {
                let errorMessege = 'Não autorizado, email ou password está incorreto';
                if (!user || !user.isPassword(user.get('password'), password))
                    throw new Error(errorMessege);
                const payload = { sub: user.get('id') };
                return {
                    token: jwt.sign(payload, utils_1.JWT_SECRET)
                };
            });
        }
    }
};

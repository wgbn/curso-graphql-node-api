"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const users = [
    { id: 1, name: 'Theo', email: 'theo@wgbn.com.br' },
    { id: 2, name: 'Dhully', email: 'dhully@wgbn.com.br' },
];
const typeDefs = `
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
    }
`;
const resolvers = {
    // resolver trivial (cria um resolver pra cada atributo do tipo)
    User: {
        id: user => user.id,
        name: user => `Meu nome é ${user.name}`
    },
    // resolvers padrao
    // queries
    Query: {
        allUsers: () => users
    },
    // mutations
    Mutation: {
        createUser: (parent, args, context, info) => {
            const newUser = Object.assign({}, args, { id: users.length + 1 });
            users.push(newUser);
            return newUser;
        }
    }
};
exports.default = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });

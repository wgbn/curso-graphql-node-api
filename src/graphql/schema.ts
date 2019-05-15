import { makeExecutableSchema } from 'graphql-tools';
import {Query} from "./query";
import {merge} from "lodash";
import {Mutation} from "./mutation";
import {userTypes} from "./resources/user/user.schema";
import {postTypes} from "./resources/post/post.schema";
import {commentTypes} from "./resources/comment/comment.schema";
import {userResolvers} from "./resources/user/user.resolvers";
import {postResolvers} from "./resources/post/post.resolvers";
import {commentResolvers} from "./resources/comment/comment.resolvers";
import { tokenTypes } from './resources/token/token.schema';
import { tokenResolvers } from './resources/token/token.resolvers';

const resolvers = merge(
    tokenResolvers,
    userResolvers,
    postResolvers,
    commentResolvers
);

const schemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        schemaDefinition,
        Query,
        Mutation,
        commentTypes,
        postTypes,
        tokenTypes,
        userTypes
    ],
    resolvers
});

const graphql = require('graphql');
const graphqlIsoDate = require('graphql-iso-date');
const UserAction = require('../models/userAction');
const parser = require('ua-parser-js');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull
} = graphql;

const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} = graphqlIsoDate;

const UserActionType = new GraphQLObjectType({
    name: 'UserAction',
    fields: () => ({
        id: { type: GraphQLID },
        timestamp: { type: GraphQLDateTime},
        application: { type: GraphQLString },
        sublocation: { type: GraphQLString },
        description: { type: GraphQLString },
        operation: { type: GraphQLString },
        ip_address: { type: GraphQLString },
        browser: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userAction: {
            type: UserActionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return UserAction.findById(args.id);
            }
        },
        userActions: {
            type: new GraphQLList(UserActionType),
            resolve(parent, args) {
                return UserAction.find({});
            }
        }
    }
});
 
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUserAction: {
            type: UserActionType,
            args: {
                application: { type: new GraphQLNonNull(GraphQLString) },
                sublocation: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                operation: { type: new GraphQLNonNull(GraphQLString) },
                ip_address: { type: GraphQLString },
                browser: { type: GraphQLString }
            },
            resolve(parent, args, context) {
                const parsedUserAgent = parser(context.headers['user-agent']);
                const userAction = new UserAction({
                    application: args.application,
                    sublocation: args.sublocation,
                    description: args.description,
                    operation: args.operation,
                    ip_address: context.ip,
                    browser: parsedUserAgent.browser.name || null
                });
                return userAction.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
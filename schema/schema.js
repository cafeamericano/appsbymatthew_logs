const graphql = require('graphql');
const UserAction = require('../models/userAction');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull 
} = graphql;

const UserActionType = new GraphQLObjectType({
    name: 'UserAction',
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        operation: { type: GraphQLString }
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
                description: { type: new GraphQLNonNull(GraphQLString) },
                operation: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let userAction = new UserAction({
                    description: args.description,
                    operation: args.operation
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
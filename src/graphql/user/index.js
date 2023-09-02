const { createModule } = require("graphql-modules");

const queryResolvers = require("./queryResolver");
const mutationResolvers = require("./mutationResolver");
const userTypeDefs = require("./schema");

// Combining both queryResolvers and mutationResolvers
const userResolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

// Creating a GraphQL module for the User's operations
const userGQLModule = createModule({
  id: "users-module",
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
});

module.exports = userGQLModule;

const { createModule } = require("graphql-modules");

const queryResolvers = require("./queryResolver");
const mutationResolvers = require("./mutationResolver");
const userTypeDefs = require("./schema");

const userResolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

const userGQLModule = createModule({
  id: "users-module",
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
});

module.exports = userGQLModule;

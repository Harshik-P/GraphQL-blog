const { createModule } = require('graphql-modules');

const queryResolvers = require("./queryResolver");
const mutationResolvers = require("./mutationResolver");
const postTypeDefs = require("./schema");
const isAuthenticated = require('../../utils/resolvedChecks');

const postResolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

const postGQLModule = new createModule({
  id: "posts-module",
  middlewares: {
    "Mutation": {
      "createPost": [isAuthenticated],
      "deletePost": [isAuthenticated],
      "updatePost": [isAuthenticated]
    }
  },
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
});

module.exports = postGQLModule;

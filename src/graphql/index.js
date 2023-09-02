const { ApolloServer } = require("@apollo/server");
const { createApplication } = require("graphql-modules");

const userGQLModule = require("./user/index");
const postGQLModule = require("./post/index");

// Creating and configuring the Apollo GraphQL server

async function createApolloGraphqlServer() {
  // Merging all the schemas which includes both resolvers and typeDefs here 
  const application = createApplication({
    modules: [userGQLModule, postGQLModule],
  });

  const schema = application.createSchemaForApollo();

  const gqlServer = new ApolloServer({
    schema,
  });

  // Start the gql server
  await gqlServer.start();

  return gqlServer;
}

module.exports = createApolloGraphqlServer;

const { ApolloServer } = require("@apollo/server");
const { createApplication } = require("graphql-modules");

const userGQLModule = require("./user/index");
const postGQLModule = require("./post/index");

async function createApolloGraphqlServer() {
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

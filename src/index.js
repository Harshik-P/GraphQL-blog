const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const createApolloGraphqlServer = require("./graphql/index");
const { verifyAccessToken } = require("./utils/jwt");
const sequelize = require("../database");
const GraphqlError = require("./utils/graphQLErrors");

async function init() {
  const app = express();
  app.use(express.json());

  const port = process.env.PORT || 5000;

  app.use(
    "/graphql",
    cors(),
    expressMiddleware(await createApolloGraphqlServer(), {  // Attaching apollo server to express server
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (token) {
          try {
            const { userId } = await verifyAccessToken(token); // Getting thr user's id using jwt token
            return { userId }; // Sharing the user's id throughout the server's resolvers
          } catch (err) {
            throw GraphqlError("Invalid token", "INVALID_TOKEN", 401);
          }
        }

        return {};
      },
    })
  );

  sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen({ port }, async () => {
      console.log(
        `Server is up and running on: http://localhost:${port}/graphql`
      );
    });
  });
}

init(); //Starting the application

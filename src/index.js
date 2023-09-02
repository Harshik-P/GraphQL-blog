const express = require("express");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const createApolloGraphqlServer = require("./graphql/index");
const { verifyAccessToken } = require("./utils/jwt");
const sequelize = require("../database");

async function init() {
  const app = express();
  app.use(express.json());

  const port = process.env.PORT || 5000;

  app.use(
    "/graphql",
    cors(),
    expressMiddleware(await createApolloGraphqlServer(), {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (token) {
          try {
            const { userId } = await verifyAccessToken(token);
            return { userId };
          } catch (err) {
            throw new Error("Invalid token");
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

init();

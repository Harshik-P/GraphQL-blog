const { GraphQLError } = require("graphql");

function GraphqlError(message, status, code) {
  return new GraphQLError(message, {
    extensions: {
      code: status,
      http: {
        status: code,
      },
    },
  });
}

module.exports = GraphqlError;

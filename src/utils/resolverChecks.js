// This is a middleware to check whether the user is authenticated or not

const GraphqlError = require('./graphQLErrors');

async function isAuthenticated({ parent, args, context, info }, next) {
  const { userId } = context;
  if (!userId) {
    throw GraphqlError("User not Authenticated", "USER_NOT_AUTHENTICATED", 401);
  }

  return next(parent, args, context, info);
};

module.exports = isAuthenticated;

async function isAuthenticated({ parent, args, context, info }, next) {
  const { userId } = context;
  if (!userId) {
    throw new Error("User not Authenticated");
  }

  return next(parent, args, context, info);
};

module.exports = isAuthenticated;

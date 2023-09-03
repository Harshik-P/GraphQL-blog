const User = require("../../models/user");
const GraphqlError = require("../../utils/graphQLErrors");

// In this file write all the query resolvers

const QueryResolvers = {
  Query: {
    getAllUsers: async (parent, args, ctx) => {
      const users = await User.findAll();

      if (!users) {
        return [];
      }

      return users;
    },
    getUserById: async (parent, args, ctx) => {
      const { userId } = args;

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw GraphqlError("User not found", "User_NOT_FOUND", 404);
      }

      return user;
    },
  },
};

module.exports = QueryResolvers;

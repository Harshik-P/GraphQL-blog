const User = require("../../models/user");

// In this file write all the query resolvers

const QueryResolvers = {
  Query: {
    getAllUsers: async (parent, args, ctx) => {
      const users = await User.findAll();

      if (!users) {
        throw new Error("No Users found");
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
        throw new Error("User not found");
      }

      return user;
    },
  },
};

module.exports = QueryResolvers;

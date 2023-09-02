const User = require("../../models/user");

const QueryResolvers = {
  Query: {
    getAllUsers: async (parent, args, ctx) => {
      return await User.findAll();
    },
    getUserById: async (parent, args, ctx) => {
      const { userId } = args;
      return await User.findOne({
        where: {
          id: userId,
        },
      });
    },
  },
};

module.exports = QueryResolvers;

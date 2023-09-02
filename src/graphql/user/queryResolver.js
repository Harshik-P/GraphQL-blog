const User = require("../../models/user");

const QueryResolvers = {
  Query: {
    getAllUsers: async (parent, args, ctx) => {
      try {
        const users = await User.findAll();

        if (!users) {
          throw new Error("No Users found");
        }

        return users;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
    getUserById: async (parent, args, ctx) => {
      const { userId } = args;

      try {
        const user = await User.findOne({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
  },
};

module.exports = QueryResolvers;

const bcrypt = require("bcrypt");

const User = require("../../models/user");
const { getAccessToken } = require("../../utils/jwt");

const mutationResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      const { username, name, email, password } = args;

      if (!(!!username && !!name && !!email)) {
        throw new Error("Please enter all the required details");
      }

      const isUsernameAlreadyExists = await User.findOne({
        where: {
          username,
        },
      });
      if (isUsernameAlreadyExists) {
        throw new Error("Username already exists");
      }

      const isEmailAlreadyExists = await User.findOne({
        where: {
          email,
        },
      });
      if (isEmailAlreadyExists) {
        throw new Error("An account with this email already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const newUser = await User.create({
          id: Date.now(),
          name,
          username,
          email,
          password: hashedPassword,
        });

        if (newUser) {
          const token = getAccessToken(newUser.id);

          return {
            token: token,
          };
        }

        return {
          message: "Something went wrong",
        };
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },

    signIn: async (_, args) => {
      const { username, password } = args;

      if (!(!!username && !!password)) {
        throw new Error("Please enter all the required details");
      }

      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          const accessToken = await getAccessToken(user.id);

          return {
            token: accessToken,
          };
        } else {
          throw new Error("Incorrect password");
        }
      } else {
        throw new Error("User not found");
      }
    },
  },
};

module.exports = mutationResolvers;

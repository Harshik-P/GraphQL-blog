const bcrypt = require("bcrypt");

const User = require("../../models/user");
const { getAccessToken } = require("../../utils/jwt");
const GraphqlError = require("../../utils/graphQLErrors");

// In this file write all the mutation resolvers

const mutationResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      const { username, name, email, password } = args;

      if (!(!!username && !!name && !!email)) {
        throw GraphqlError("Please enter all the required fields", "INSUFFICIENT_DATA", 400);
      }

      const isUsernameAlreadyExists = await User.findOne({
        where: {
          username,
        },
      });
      if (isUsernameAlreadyExists) {
        throw GraphqlError("username already exists", "USERNAME_ALREADY_EXISTS", 409);
      }

      const isEmailAlreadyExists = await User.findOne({
        where: {
          email,
        },
      });
      if (isEmailAlreadyExists) {
        throw GraphqlError("An account with this email already exists", "EMAIL_ALREADY_EXISTS", 409);
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
        throw GraphqlError("Something went wrong", "SOMETHING_WENT_WRONG", 500);
      }
    },

    signIn: async (_, args) => {
      const { username, password } = args;

      if (!(!!username && !!password)) {
        throw GraphqlError("Please enter all the required fields", "INSUFFICIENT_DATA", 400);
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
          throw GraphqlError("Incorrect password", "INVALID_PASSWORD", 401);
        }
      } else {
        throw GraphqlError("User not found", "USER_NOT_FOUND", 404);
      }
    },
  },
};

module.exports = mutationResolvers;

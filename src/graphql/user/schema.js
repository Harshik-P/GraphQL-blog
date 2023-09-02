const { gql } = require("graphql-modules");

// In this file describe all the typeDefs (types, mutations and queries)

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    username: String
    email: String
  }

  type SignInResponse {
    token: String!
  }

  type Query {
    getAllUsers: [User]
    getUserById(userId: String!): User
  }

  type Mutation {
    createUser(
      username: String!
      name: String!
      email: String!
      password: String!
    ): SignInResponse!
    signIn(username: String!, password: String!): SignInResponse!
  }
`;

module.exports = typeDefs;

const { gql } = require("graphql-modules");

const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String
    content: String
    authorId: String
  }

  type Message {
    message: String
  }

  type Query {
    getAllPosts: [Post]
    getPostById(postId: String!): Post
    getAllPostsOfUser(userId: String): [Post]
  }

  type Mutation {
    createPost(title: String!, content: String!): Message!
    deletePost(postId: String!): Message!
    updatePost(postId: String!, title: String, content: String): Post!
  }
`;

module.exports = postTypeDefs;

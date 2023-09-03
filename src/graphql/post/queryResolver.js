const Post = require("../../models/post");
const GraphqlError = require("../../utils/graphQLErrors");

const QueryResolvers = {
  Query: {
    getAllPosts: async (parent, args, ctx) => {
      const posts = await Post.findAll();

      if (!posts) {
        return [];
      }

      return posts;
    },
    getPostById: async (parent, args, ctx) => {
      const { postId } = args;
      const post = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw GraphqlError("Post not found", "POST_NOT_FOUND", 404);
      }

      return post;
    },
    getAllPostsOfUser: async (parent, args, ctx) => {
      const { userId } = args;

      const posts = await Post.findAll({
        where: {
          authorId: userId,
        },
      });

      if (!posts) {
        return [];
      }

      return posts;
    },
  },
};

module.exports = QueryResolvers;

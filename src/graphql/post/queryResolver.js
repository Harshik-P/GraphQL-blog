const Post = require("../../models/post");

const QueryResolvers = {
  Query: {
    getAllPosts: async (parent, args, ctx) => {
      const posts = await Post.findAll();

      if (!posts) {
        throw new Error("No Posts are there for the moment");
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
        throw new Error("Post not found");
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
        throw new Error("No Posts found for the user");
      }

      return posts;
    },
  },
};

module.exports = QueryResolvers;

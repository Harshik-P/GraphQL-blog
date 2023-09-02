const Post = require("../../models/post");

const QueryResolvers = {
  Query: {
    getAllPosts: async (parent, args, ctx) => {
      return await Post.findAll();
    },
    getPostById: async (parent, args, ctx) => {
      const { postId } = args;
      return await Post.findOne({
        where: {
          id: postId,
        },
      });
    },
    getAllPostsOfUser: async (parent, args, ctx) => {
      const { userId } = args;
      return await Post.findAll({
        where: {
          authorId: userId,
        },
      });
    },
  },
};

module.exports = QueryResolvers;

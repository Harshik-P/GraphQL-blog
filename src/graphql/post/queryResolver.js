const Post = require("../../models/post");

const QueryResolvers = {
  Query: {
    getAllPosts: async (parent, args, ctx) => {
      try {
        const posts = await Post.findAll();

        if (!posts) {
          throw new Error("No Posts are there for the moment");
        }

        return posts;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
    getPostById: async (parent, args, ctx) => {
      const { postId } = args;
      try {
        const post = await Post.findOne({
          where: {
            id: postId,
          },
        });

        if (!post) {
          throw new Error("Post not found");
        }

        return post;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
    getAllPostsOfUser: async (parent, args, ctx) => {
      const { userId } = args;

      try {
        const posts = await Post.findAll({
          where: {
            authorId: userId,
          },
        });

        if (!posts) {
          throw new Error("No Posts found for the user");
        }

        return posts;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
  },
};

module.exports = QueryResolvers;

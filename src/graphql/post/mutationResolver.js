const Post = require("../../models/post");
const GraphqlError = require("../../utils/graphQLErrors");

const mutationResolvers = {
  Mutation: {
    createPost: async (parent, args, context) => {
      const { userId } = context;
      const { title, content } = args;

      if (!(!!title || !!content)) {
        throw GraphqlError("Please enter all the required fields", "INSUFFICIENT_DATA", 400);
      }

      try {
        const newPost = await Post.create({
          id: Date.now(),
          title,
          content,
          authorId: userId,
        });
        return {
          message: `Post created with id ${newPost.id}`,
        };
      } catch (error) {
        console.log(error);
        throw GraphqlError("Something went wrong", "SOMETHING_WENT_WRONG", 500);
      }
    },

    updatePost: async (parent, args, context) => {
      const { userId } = context;
      const { title, content, postId } = args;

      if (!(!!postId || !!userId)) {
        throw GraphqlError("Please enter all the required fields", "INSUFFICIENT_DATA", 400);
      }

      const findPostOnlyWithPostId = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!findPostOnlyWithPostId) {
        throw GraphqlError("Post not found", "POST_NOT_FOUND", 404);
      }

      const findPostWithUserId = await Post.findOne({
        where: {
          id: postId,
          authorId: userId,
        },
      });

      if (!findPostWithUserId) {
        throw GraphqlError("You can only update your posts", "NOT_AUTHORIZED", 403);
      }

      try {
        const updatePost = await Post.update(
          {
            title: title ? title : findPostWithUserId.title,
            content: content ? content : findPostWithUserId.content,
          },
          {
            where: {
              id: postId,
              authorId: userId,
            },
          }
        );

        return {
          id: postId,
          title: title ? title : findPostWithUserId.title,
          content: content ? content : findPostWithUserId.content,
          authorId: userId,
        };
      } catch (error) {
        console.log(error);
        throw GraphqlError("Something went wrong", "SOMETHING_WENT_WRONG", 500);
      }
    },

    deletePost: async (parent, args, context) => {
      const { userId } = context;
      const { postId } = args;

      if (!(!!postId || !!userId)) {
        throw GraphqlError("Please enter all the required fields", "INSUFFICIENT_DATA", 400);
      }

      const findPostOnlyWithPostId = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!findPostOnlyWithPostId) {
        throw GraphqlError("Post not found", "POST_NOT_FOUND", 404);
      }

      const findPostWithUserId = await Post.findOne({
        where: {
          id: postId,
          authorId: userId,
        },
      });

      if (!findPostWithUserId) {
        throw GraphqlError("You can only delete your posts", "NOT_AUTHORIZED", 403);
      }

      try {
        const deletePost = await Post.destroy({
          where: {
            id: postId,
            authorId: userId,
          },
        });

        return {
          message: `Deleted post with id ${postId}`,
        };
      } catch (error) {
        console.log(error);
        throw GraphqlError("Something went wrong", "SOMETHING_WENT_WRONG", 500);
      }
    },
  },
};

module.exports = mutationResolvers;

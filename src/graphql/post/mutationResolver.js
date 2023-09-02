const Post = require("../../models/post");

const mutationResolvers = {
  Mutation: {
    createPost: async (parent, args, context) => {
      const { userId } = context;
      const { title, content } = args;

      if (!(!!title || !!content)) {
        throw new Error("Please enter all the required fields");
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
        throw new Error("Something went wrong");
      }
    },

    updatePost: async (parent, args, context) => {
      const { userId } = context;
      const { title, content, postId } = args;

      if (!(!!postId || !!userId)) {
        throw new Error("Please login and enter the postId");
      }

      const findPostOnlyWithPostId = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!findPostOnlyWithPostId) {
        throw new Error("Post not found");
      }

      const findPostWithUserId = await Post.findOne({
        where: {
          id: postId,
          authorId: userId,
        },
      });

      if (!findPostWithUserId) {
        throw new Error("You can only update your posts");
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
        throw new Error("Something went wrong");
      }
    },

    deletePost: async (parent, args, context) => {
      const { userId } = context;
      const { postId } = args;

      if (!(!!postId || !!userId)) {
        throw new Error("Please login and enter the postId");
      }

      const findPostOnlyWithPostId = await Post.findOne({
        where: {
          id: postId,
        },
      });

      if (!findPostOnlyWithPostId) {
        throw new Error("Post not found");
      }

      const findPostWithUserId = await Post.findOne({
        where: {
          id: postId,
          authorId: userId,
        },
      });

      if (!findPostWithUserId) {
        throw new Error("You can only update your posts");
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
        throw new Error("Something went wrong");
      }
    },
  },
};

module.exports = mutationResolvers;

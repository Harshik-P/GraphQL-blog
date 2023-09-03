const userQueryResolvers = require("./src/graphql/user/queryResolver");
const userMutationResolvers = require("./src/graphql/user/mutationResolver");
const User = require("./src/models/user");
const postQueryResolvers = require("./src/graphql/post/queryResolver");
const postMutationResolvers = require("./src/graphql/post/mutationResolver");
const Post = require("./src/models/post");

const userResolvers = {
  ...userQueryResolvers,
  ...userMutationResolvers,
};

const postResolvers = {
    ...postQueryResolvers,
    ...postMutationResolvers,
  };
  

describe("Test GraphQL API's", ()=> {
    test('should return all users', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
      };
      User.findAll = jest.fn().mockResolvedValue(mockUser);

      const result = await userResolvers.Query.getAllUsers(null, null);
      expect(result).toEqual(mockUser);      
    });
    test('should return all posts', async () => {
      const mockUser = [
        {
          id: 1,
          title: "Title 1",
          content: "Content 1",
          authorId: "1"
        },
        {
          id: 2,
          title: "Title 2",
          content: "Content 2",
          authorId: "1"
        }];
        Post.findAll = jest.fn().mockResolvedValue(mockUser);
  
        const result = await postResolvers.Query.getAllPosts(null, null);
        expect(result).toEqual(mockUser);
    });
})
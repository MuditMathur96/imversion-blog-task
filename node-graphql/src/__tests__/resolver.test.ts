
import { PrismaClient } from '@prisma/client';
import prisma from '../__mocks__/prisma';

jest.mock('../infrastructure/database/prisma',()=>({
    blogPost: {
        count: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
}));


import PostResolvers from '../graphql/resolvers';

describe('Resolvers', () => {
    const resolverClass = new PostResolvers(prisma as unknown as PrismaClient);
    const resolvers = resolverClass.getResolvers();
  describe('Query', () => {
    it('should fetch posts with pagination', async () => {
      const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
      prisma.blogPost.count.mockResolvedValue(2);
      prisma.blogPost.findMany.mockResolvedValue(mockPosts);

      const result = await resolvers.Query.getPosts(null, { pageNumber: 1, pageSize: 2 });
      expect(result).toEqual({ totalPosts: 2, blogs: mockPosts });

      expect(prisma.blogPost.count).toHaveBeenCalled();
      expect(prisma.blogPost.findMany).toHaveBeenCalledWith({
        orderBy: [{ createdAt: 'desc' }],
        skip: 0,
        take: 2,
      });
    });

    it('should fetch posts by category with pagination', async () => {
      const mockPosts = [{ id: 1, title: 'Post 1', category: 1 }];
      prisma.blogPost.count.mockResolvedValue(1);
      prisma.blogPost.findMany.mockResolvedValue(mockPosts);

      const result = await resolvers.Query.getPostsByCategory(null, { pageNumber: 1, pageSize: 2, category: 1 });
      expect(result).toEqual({ totalPosts: 1, blogs: mockPosts });

      expect(prisma.blogPost.count).toHaveBeenCalledWith({ where: { category: 1 } });
      expect(prisma.blogPost.findMany).toHaveBeenCalledWith({
        where: { category: 1 },
        orderBy: [{ createdAt: 'desc' }],
        skip: 0,
        take: 2,
      });
    });

    it('should fetch post by id', async () => {
      const mockPost = { id: 1, title: 'Post 1' };
      prisma.blogPost.findUnique.mockResolvedValue(mockPost);

      const result = await resolvers.Query.getPostById(null, { id: 1 });
      expect(result).toEqual(mockPost);

      expect(prisma.blogPost.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('Mutation', () => {
    it('should create a blog post', async () => {
      const mockPost = { id: 1, title: 'Post 1', content: 'Content', featured: false, imageUrl: '', excerpt: '', category: 1 ,userId:"mocked_user"};
      prisma.blogPost.create.mockResolvedValue(mockPost);

      const result = await resolvers.Mutation.createBlogPost(null, {
        title: 'Post 1',
        content: 'Content',
        featured: false,
        imageUrl: '',
        excerpt: '',
        category: 1,
        userId:"mocked_user"
      });
      expect(result).toEqual(mockPost);

      expect(prisma.blogPost.create).toHaveBeenCalledWith({
        data: { title: 'Post 1', content: 'Content', featured: false, imageUrl: '', excerpt: '', category: 1,userId:"mocked_user" },
      });
    });

    it('should delete a blog post', async () => {
      const mockPost = { id: 1, title: 'Post 1' };
      prisma.blogPost.delete.mockResolvedValue(mockPost);

      const result = await resolvers.Mutation.deleteBlogPost(null, { id: 1 });
      expect(result).toEqual(mockPost);

      expect(prisma.blogPost.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

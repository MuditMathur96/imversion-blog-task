import { gql } from "@apollo/client";
import {z} from 'zod';

const createPostSchema=z.object({
    title:z.string(),
    excerpt:z.string(),
    imageUrl:z.string(),
    content:z.string()
})




export const CreatePostQuery = ()=>{
    return `mutation CreateBlogPost($title: String!, $content: String!, $excerpt: String!, $featured: Boolean!, $imageUrl: String!, $category: Int!,$userId:String!) {
  createBlogPost(title: $title, 
  category: $category,
  content: $content, 
  excerpt: $excerpt, 
  featured: $featured, 
  imageUrl: $imageUrl,
  userId: $userId
  ) {
  id  
  }
}`
}
export const getPostsQuery=()=>{
    return `query GetPosts {
  getPosts {
      blogs {
        id,
        excerpt,
        title,
        imageUrl
      },
      totalPosts
  }
}`
}

export const getPostByIdQuery=():string=>{

    return `query GetPostById($id: Int!) {
     getPostById(id: $id) {
        id,
        userId,
        title,
        content,
        imageUrl,
        createdAt

  }
}`  

}

export const getPostsByCategoryQuery=():string=>{
  return `query GetPostsByCategory($category: Int,$pageNumber:Int) {
  getPostsByCategory(category: $category,pageNumber:$pageNumber) {
    blogs {
      id,title,imageUrl,excerpt,category
    },
    totalPosts
  }
}`
}

export const deletePostQuery=()=>{
  return `mutation DeleteBlogPost($id: Int!) {
  deleteBlogPost(id: $id) {
    id
  }
}`
}
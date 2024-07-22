

const typeDefs=`#graphql

type BlogPost {
    id:Int!,
    userId: String!,
    title: String!,
    imageUrl: String!,
    excerpt: String!,
    content: String!,
    category: Int!,
    featured: Boolean!,
    createdAt: String!,
    updatedAt: String!
}
type BlogResponse {
    blogs:[BlogPost!],
    totalPosts: Int!
}


type Query{
    getPosts(pageNumber:Int,pageSize:Int):BlogResponse!
    getPostsByCategory(pageNumber:Int,pageSize:Int,category:Int): BlogResponse!
    getPostById(id:Int!): BlogPost

}

type Mutation{
    createBlogPost(title:String!,content:String!,excerpt:String!,featured:Boolean!,imageUrl:String!, category:Int, userId:String!):BlogPost!
    deleteBlogPost(id:Int!): BlogPost
}

`;

export default typeDefs;
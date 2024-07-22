import { PrismaClient } from "@prisma/client";
//import prisma from "../../infrastructure/database/prisma";


class PostResolvers{
    private prisma:PrismaClient;
    constructor(prisma:PrismaClient){
        this.prisma = prisma
    }

    getResolvers(){
        return {
            Query:{
                getPosts:async(_:any,{pageNumber=1,pageSize=5}:{pageNumber:number,pageSize:number})=>{
                    console.log(pageNumber,pageSize);
                    const totalPostPromise = this.prisma.blogPost.count();
                    const postsPromise = this.prisma.blogPost.findMany({
                        orderBy:[{
                            createdAt:"desc"
                        }],
                        skip:(pageNumber-1) * pageSize,
                        take:pageSize,
        
                    }); 
        
                    const [totalPosts,blogs] = await Promise.all([totalPostPromise,postsPromise]);
                    
                    return {
                        totalPosts,blogs
                    }
                },
                getPostsByCategory:async(_:any,{pageNumber=1,pageSize=5,category}:{category?:number | null, pageNumber:number,pageSize:number})=>{
                    console.log(category,"-",pageNumber);
                    const totalPostPromise = category?this.prisma.blogPost.count({
                        where:{category}
                    }):this.prisma.blogPost.count();; 
                    const postsPromise =category? this.prisma.blogPost.findMany({
                        where:{
                            category
                        },
                        orderBy:[{
                            createdAt:"desc"
                        }],
                        skip:(pageNumber-1) * pageSize,
                        take:pageSize,
        
                    }):this.prisma.blogPost.findMany({
                        orderBy:[{
                            createdAt:"desc"
                        }],
                        skip:(pageNumber-1) * pageSize,
                        take:pageSize,
                    }); 
        
                    const [totalPosts,blogs] = await Promise.all([totalPostPromise,postsPromise]);
                    
                    return {
                        totalPosts,blogs
                    }
                },
                getPostById:async(_:any,{id}:{id:number})=>{
                    return await this.prisma.blogPost.findUnique({
                        where:{id}
                    });
                }
               
            },
            Mutation:{
                createBlogPost: async(_:any,{title,content,featured,excerpt,imageUrl,category,userId}
                    :{title:string,content:string,featured:boolean,imageUrl:string,excerpt:string,category:number,userId:string})=>{
                        return await this.prisma.blogPost.create({
                            data:{
                                title,content,imageUrl,featured,excerpt,category,userId
                            }
                        })
                    },
                deleteBlogPost:async(_:any,{id}
                    :{id:number})=>{
                        return await this.prisma.blogPost.delete({
                            where:{id}
                        });
                }
            }
            
        }
    }
    

   

   


}

// const resolvers ={
//     Query:{
//         getPosts:async(_:any,{pageNumber=1,pageSize=5}:{pageNumber:number,pageSize:number})=>{
//             console.log(pageNumber,pageSize);
//             const totalPostPromise = prisma.blogPost.count();
//             const postsPromise = prisma.blogPost.findMany({
//                 orderBy:[{
//                     createdAt:"desc"
//                 }],
//                 skip:(pageNumber-1) * pageSize,
//                 take:pageSize,

//             }); 

//             const [totalPosts,blogs] = await Promise.all([totalPostPromise,postsPromise]);
            
//             return {
//                 totalPosts,blogs
//             }
//         },
//         getPostsByCategory:async(_:any,{pageNumber=1,pageSize=5,category}:{category?:number | null, pageNumber:number,pageSize:number})=>{
//             console.log(category,"-",pageNumber);
//             const totalPostPromise = category?prisma.blogPost.count({
//                 where:{category}
//             }):prisma.blogPost.count();; 
//             const postsPromise =category? prisma.blogPost.findMany({
//                 where:{
//                     category
//                 },
//                 orderBy:[{
//                     createdAt:"desc"
//                 }],
//                 skip:(pageNumber-1) * pageSize,
//                 take:pageSize,

//             }):prisma.blogPost.findMany({
//                 orderBy:[{
//                     createdAt:"desc"
//                 }],
//                 skip:(pageNumber-1) * pageSize,
//                 take:pageSize,
//             }); 

//             const [totalPosts,blogs] = await Promise.all([totalPostPromise,postsPromise]);
            
//             return {
//                 totalPosts,blogs
//             }
//         },
//         getPostById:async(_:any,{id}:{id:number})=>{
//             return await prisma.blogPost.findUnique({
//                 where:{id}
//             });
//         }
       
//     },

//     Mutation:{
//         createBlogPost: async(_:any,{title,content,featured,excerpt,imageUrl,category,userId}
//             :{title:string,content:string,featured:boolean,imageUrl:string,excerpt:string,category:number,userId:string})=>{
//                 return await prisma.blogPost.create({
//                     data:{
//                         title,content,imageUrl,featured,excerpt,category,userId
//                     }
//                 })
//             },
//         deleteBlogPost:async(_:any,{id}
//             :{id:number})=>{
//                 return await prisma.blogPost.delete({
//                     where:{id}
//                 });
//         }
//     }
// }

export default PostResolvers;
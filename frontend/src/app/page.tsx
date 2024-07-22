import { getPosts } from "@/api/post.api";
import Post from "@/components/post/post";
import Image from "next/image";



export const dynamic = 'force-dynamic'



export default async  function Home() {
  const data:{
    blogs:any[],
    totalPosts:number
  } = await getPosts(1,5);



  return (
    <div className="h-full w-full p-4 
    flex flex-col gap-2 md:gap-4  ">
            <h1
        className='text-2xl my-2 p-2 font-medium'
        >Latest posts</h1>
        <hr />
        {/* Featured posts */}
        <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
          <div className="w-full flex-1 h-full">
            {/* Post container */}
           {data.blogs[0] &&  <Post
           id={data.blogs[0].id}
            size="lg"
            title={data?.blogs[0]?.title}
            excerpt={data?.blogs[0]?.excerpt}
            imageUrl={data?.blogs[0]?.imageUrl}
            />}
          </div>
          <div className=" w-full flex-1 h-full">
            {
              (data.blogs as Array<any>).slice(1,3).map((post,idx)=>{
                return <Post 
                key ={post.id}
                id={post.id}
                size="sm"
                title={post?.title}
                excerpt={post?.excerpt}
                imageUrl={post?.imageUrl}
                />
              })

            }
           
            
          </div>
        </div>

        {/* Post slider */}
        <div
         className="flex flex-col gap-4"
        >
          {
            data.blogs.length>3?
            data.blogs.slice(3,6).map((post,idx)=>{
              return <Post 
                key ={post.id}
                id={post.id}
                size="md"
                title={post?.title}
                excerpt={post?.excerpt}
                imageUrl={post?.imageUrl}
                />

            })
            :null
          }
        </div>
    </div>
  );
}

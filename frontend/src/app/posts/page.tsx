import { getPosts } from '@/api/post.api'
import Pagination from '@/components/pagination/pagination'
import Post from '@/components/post/post'
import React from 'react'

export const dynamic = "force-dynamic";

type Props = {
  params:{page:number}
}

async function Page({params}: Props) {

  const data =await  getPosts(params.page);

  

  return (
    <div
    className='w-full h-full p-4 
    flex flex-col gap-4 '
    >   

        <h1
        className='text-2xl my-2 p-2 font-medium'
        >All Posts</h1>
        <hr />
        <div 
        className='flex flex-col gap-4'>
        {
          data.blogs?.length?
          data.blogs.map((b:any)=>{
            return  <Post
            imageUrl={b.imageUrl}
            key={b.id}
            id={b.id} 
            size='md'
             title={b.title}
              excerpt={b.excerpt} />
          })
          :null
        }
       
        </div>
        <hr />
        <div>
            <Pagination 
            baseUrl='/posts'
            page={params.page} total={data.totalPosts} />
        </div>
    </div>
  )
}

export default Page
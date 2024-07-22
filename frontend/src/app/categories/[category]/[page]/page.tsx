import { getPostByCategory, getPosts } from '@/api/post.api'
import Pagination from '@/components/pagination/pagination'
import Post from '@/components/post/post'
import { CATEGORIES } from '@/constants'
import Link from 'next/link'
import React from 'react'


export const dynamic = 'force-dynamic'

type Props = {
  params:{category:string,page:string}
}

function CategoryItem({id,title,active}:{id:string,title:string,active?:boolean}){
    return <Link href={`/categories/${id}/1`}>
        <div 
        className={`
            ${active?"bg-blue-300 text-white":""}
        px-4 py-2 border rounded-full`}>
            {title}
        </div>
  
    </Link>
  }

async function Page({params}: Props) {

    console.log(typeof params.page)
 const data =await  getPostByCategory(
    params.category === "all"?0:parseInt(params.category),
   parseInt(params.page));


  return (
    <div
    className='w-full h-full p-4 
    flex flex-col gap-4 '
    >   
        <div
        className=' flex flex-col md:flex-row items-center justify-between'
        >
        <h1
        className='text-2xl my-2 p-2 font-medium'
        >Categories</h1>

        <div className='flex items-center justify-center gap-4'>
            <CategoryItem
            active={params.category === "all"}
            id={"all"} title={"All"}  />
            {
                CATEGORIES.map(c=><CategoryItem 
                key={c.id}
                id={c.id}
                title={c.name}
                active={params.category === c.id}
                />)
            }
        </div>

        </div>

        <hr />
        <div 
        className=' flex flex-col gap-4'>
         {
            !data.blogs || !data.blogs.length?
            <div
            className='w-full text-center p-2'
            >No post to show</div>
            :null
         }   
        {
          data?.blogs?.length?
          data?.blogs.map((b:any)=>{
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
            baseUrl={`/categories/${params.category}`}
            page={1} total={data.totalPosts} />
        </div>
    </div>
  )
}

export default Page
import { getPostById } from '@/api/post.api'
import React from 'react'
import Image from 'next/image';
import Content from '@/components/content/content';
import DeleteButton from '@/components/delete-button/delete-button';

const dynamic = "force-dynamic";

type Props = {
    params:{
        slug:string
    }
}

async function PostDetail({params}: Props) {

  const post = await getPostById(parseInt(params.slug));

  if(!post){
    return(<div>
      Post not found
    </div>)
  }



  return (
    <div
    className='p-4 md:p:16 lg:p-32
    flex flex-col gap-4
    '
    >
        {/* Title */}
        <div
        className='flex 
        flex-col-reverse md:flex-row 
        items-start gap-2
        md:items-center md:justify-between'
        >
          <h2
          className='text-xl lg:text-3xl font-medium uppercase'
          >{post?.title}</h2>
          <div className=' place-self-end'>
            <DeleteButton 
            postId={parseInt(params.slug)}
            createdBy={post.userId}

            />
          </div>

        </div>
        {/* Image */}
        <Image
        alt={post?.title}
        src={post?.imageUrl}
        width={320}
        height={200}

        className='h-[200px] md:h-[320px] lg:h-[620px] w-full
        object-fill'
        />

        
        {/* Content */}
        <div className='text-justify flex flex-col items-center'>
            <Content
            content={post?.content}
            />
        </div>
    </div>
  )
}

export default PostDetail
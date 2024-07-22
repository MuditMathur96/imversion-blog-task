import { deletePostAction } from '@/actions/post';
import { auth } from '@clerk/nextjs/server';
import { Trash } from 'lucide-react';
import React from 'react'

type Props = {
    postId:number,
    createdBy:string
}

function DeleteButton({postId,createdBy}: Props) {

    const {userId} = auth();
    if(!userId || createdBy !== userId){
        return null;
    }

  return (
    <div>
        <form
        action={deletePostAction}
        >
            <input  hidden readOnly value={postId} name="id"/>
            <button
            className='p-3 bg-red-600 rounded-lg text-white
            hover:scale-105 duration-200 
            text-sm
            flex items-center justify-center gap-2
            '
            >
            <Trash className='w-4 h-4' />
            <p className='hidden md:block'>Delete Post</p>
                </button>
        </form>
    </div>
  )
}

export default DeleteButton
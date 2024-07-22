"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    id:number,
    size:"sm" | "md" | "lg",
    title:string,
    excerpt:string,
    imageUrl:string,

}

function Post({id,title,excerpt,imageUrl,size="sm"}: Props) {

  return (
    <Link href={"/post/"+id}>
    <div className={`flex gap-4
       ${size==="lg"?"flex-col items-start justify-center   h-full":"items-start justify-start"}
    p-4`}>
              {/* Post Image */}
              <Image 
            
              alt={title}
              src={imageUrl}
              width={300}
              height={200}
              className={`
              ${size==="lg"?"w-full h-[320px]"
              :size==="md"?"w-[80px] md:w-[120px] lg:w-[180px]"
              :"w-[80px] md:w-[200px] "}`} />
              {/* Post Data */}
              <div className=" flex flex-col gap-2">
                <h3 className={`text-sm text-start  md:text-xl font-semibold`}>{title}</h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {excerpt.length>180?excerpt.substring(0,180)+ "...":excerpt}</p>
              </div>
    </div>
    </Link>
  )
}

export default Post
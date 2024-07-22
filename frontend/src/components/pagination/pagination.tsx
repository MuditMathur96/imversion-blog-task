
import Link from 'next/link'
import React, { useMemo, useState } from 'react';


type Props = {
    page:number,
    total:number,
    baseUrl:string,
}

type PageItemProps={
    number:number,
    baseUrl:string,
    active:boolean
}

function PageItem({number,active,baseUrl}:PageItemProps){

    return (<Link
    href={baseUrl+"/"+number}
        
    >
        <div
        className={`duration-200
            px-4 py-2 md:py-2 :px-4 
            cursor-pointer select-none
           ${active && "bg-blue-300 text-white"}
           text-xs md:text-md lg:text-lg
           `
       }>

    {number}
        </div>
    </Link>)
}

function Pagination({page=1,total,baseUrl}: Props) {
    const pageItems:boolean[] = new Array(Math.ceil(total/5)+1).fill(true);
   
  return (
    <div className='flex flex-wrap items-center justify-start gap-1 md:gap-4'>
        
        {
            pageItems.map((_,index)=>{
                if(index ===0) return null;
                return <PageItem 
                baseUrl={baseUrl}
                key={index} 
                active={index == page}
                number={index}
                />
            })
        }
      
    </div>
  )
}

export default Pagination
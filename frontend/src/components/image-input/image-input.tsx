"use client"
import React, { useMemo, useState } from 'react'

type Props = {
  image:Blob | null,
  setImage:any
}

function ImageInput({image,setImage}: Props) {
  //const [image,setImage] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const imageUrl:string | null = useMemo(()=>{
    if(image){
        return URL.createObjectURL(image);
    }
    return null
  },[image]);

  // async function HandleUpload(file:File){
    
  //   const body = new FormData();
  //   body.append("file",file);
  //   setLoading(true);
  //   try{

  //     const res = await fetch("http://localhost:3000/api/v1/upload",{
  //       method:"POST",
  //       body
  //     })
  //     const data = await res.json();
  //     setImage(data?.data);
  //   }catch(e){

  //   }
  //   setLoading(false);
    
  // }
  return (
    <div>
        {imageUrl && <img
        alt="post image"
        src={imageUrl}
        className='w-full h-[200px] object-contain'
        />}
        <label htmlFor="image"
                className='h-[100px]  rounded- w-full 
                border-dashed border-2
                flex items-center justify-center
                rounded-lg
                cursor-pointer
                '
                >{!loading ?
                  image?"Change cover image"
                  :"Upload cover image"
               :"Loading"
                }</label>
                <input type="file" id="image"
               
                disabled={loading}
                accept='.png,.jpg,.jpeg'
                name="image"
                onChange={(e)=>setImage(e.target.files![0])}
                className='hidden'  />
    </div>
  )
}

export default ImageInput
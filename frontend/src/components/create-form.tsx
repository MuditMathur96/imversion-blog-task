
"use client"
import React, { useRef, useState } from 'react'
// import Editor from './editor/editor'
import ImageInput from './image-input/image-input';
import EditorJS,{ OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { CATEGORIES } from '@/constants';

//Import the rich text editor dynamically to skip server sider rendering
const Editor = dynamic(()=>import("@/components/editor/editor"),{
  ssr:false,
  loading:()=>{
    return <div className='flex justify-center items-center gap-4'>
      <div className='h-4 w-4 border-t-2 border-slate-800 rounded-full animate-spin'></div>
      Loading editor</div>
  }
})


function CreatePostForm() {
  const [coverImage,setCoverImage] = useState<Blob | null>(null);
  const [title,setTitle] = useState<string>("");
  const [excerpt,setExcerpt] = useState<string>("");
  const [loading,setLoading] = useState<boolean>(false);
  const editorRef = useRef<EditorJS | null>(null);
  const [category,setCategory] = useState<string>("");

  async function handleSubmit(e:React.FormEvent){
    setLoading(true);
      e.preventDefault();
      console.log(title);
      console.log(excerpt);
      let content = await editorRef.current?.save();
      console.log(content);

      const formData = new FormData();
      formData.append("title",title);
      formData.append("excerpt",excerpt);
      formData.append("image",coverImage!);
      formData.append("content",JSON.stringify(content));
      formData.append("category",category);

      try{
        const res = await fetch("/api/v1/post",{
          method:"POST",
          body:formData
        })
       



      }catch(err){

      }

      setLoading(false);


  }
    
  return (
    <div
    className='flex flex-col gap-4 p-4'
    >
        <h1
        className='text-2xl '
        >Whats on your mind today?</h1>
        <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4'
        >
             {/* Image */}
             <div className='w-full'>
                <ImageInput 
                image={coverImage}
                setImage={setCoverImage}
                />
            </div>
            {/* Title and category */}
            <div
            className="
             flex flex-col md:flex-row items-start md:items-center justify-start  
            gap-4"
            >

            <input 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            placeholder='Enter title '
            className='outline-none border rounded-lg p-2 w-full md:w-1/2'
            maxLength={100}
            />
            <select
            value={category}
            required
            onChange={(e)=>setCategory(e.target.value)}
            className='p-2 rounded-lg border w-full md:w-1/2 outline-none'
            >
              <option value=""  className='p-2'>Select Category</option>
              {
                CATEGORIES.map((cat)=>{
                  return <option
                  className='p-2'
                  key={cat.id}
                  value={cat.id}
                  >{cat.name}</option>
                })
              }
            </select>
            </div>
            {/* Excerpt */}
            <textarea
            value={excerpt}
            onChange={(e)=>setExcerpt(e.target.value)}
            required
            placeholder='Enter excerpt'
            className='outline-none border rounded-lg p-2 max-h-[200px] min-h-[80px]'
            maxLength={200}
            >

            </textarea>

           

            {/* Content */}
            <Editor
            editorRef={editorRef}
            />

            {/* Submit */}
            <button
            className='border p-2 rounded-lg flex justify-center disabled:bg-slate-100'
            disabled={loading}
            >{
              loading?<div 
              className='w-6 h-6 border-t-2 rounded-full border-slate-500 animate-spin '
              />:"Save"
            }</button>
        </form>
    </div>
  )
}

export default CreatePostForm
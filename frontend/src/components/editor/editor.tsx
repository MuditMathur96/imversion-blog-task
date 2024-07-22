"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs';

import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Quote from '@editorjs/quote';

//@ts-ignore
import Table from '@editorjs/table';

import {Editor as DraftEditor,EditorState} from 'draft-js';
import "draft-js/dist/Draft.css";


type Props = {
  //onChange:(data:OutputData)=>void,
  editorRef:React.MutableRefObject<EditorJS | null>
}

function Editor({editorRef}: Props) {

  //const editorRef = useRef<EditorJS | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [mounted,setMounted] = useState<boolean>(false);
  const [state,setState] = useState(()=>EditorState.createEmpty());

  useEffect(()=>{
    setMounted(true);

    return ()=>{
      setMounted(false);
      if(editorRef.current){
        editorRef.current.destroy();
        editorRef.current= null;
      }
    }

  
  },[]);

  useEffect(()=>{
    if(mounted){
      editorRef.current = new EditorJS({
        holder:divRef.current!,
        placeholder:"Type here...",
        tools:{
          table:Table,
          header:{
            //@ts-ignore
            class: Header,
            config:{
              placeholder:"heading..."
            }
          },
          quote:Quote,
          list:{
            class:List,
            inlineToolbar:true,
            config:{
              defaultStype:'unordered'
            }
          }
        }
      });
    }

  },[mounted])

  return (
    <div
    className='w-full prose '
    ref={divRef}
    >
    </div>
  )
}

export default Editor
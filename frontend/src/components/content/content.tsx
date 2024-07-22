import React from 'react'

import edjParser from 'editorjs-html';
import { EditorBlock } from 'draft-js';


type Props = {
    content:string
}

function Content({content}: Props) {
    const blocks = JSON.parse(content)?.blocks || [];
    const parser = edjParser();

    let html= "";
    blocks.forEach((b:any)=>{
      html+= parser.parseBlock(b);
    })
  return (
    <div 
    className=' prose'
    dangerouslySetInnerHTML={{
        __html:html
    }}>
      </div>
  )
}

export default Content
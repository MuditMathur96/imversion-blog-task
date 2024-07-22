import fs from 'fs';
import path from 'path';
/**
 * 
 * @param file 
 * @returns url of the uploaded image
 */
export async function HandleFileUpload(file:File):Promise<string>{
    console.log( file);
    const url = await WriteToLocal(file);
    console.log(url);
    return url;
    
  
   
}
/**
 * 
 * @param file 
 * @returns local url of the uploaded file
 */
async function WriteToLocal(file:File):Promise<string>{
    const fileName=  Date.now().toString()+"_"+file.name
    const filePath = path.join("./public","images",fileName);
    const fileBuffer = await file.arrayBuffer();
    return await new Promise((res,rej)=>{
      
      fs.writeFile(filePath,Buffer.from(fileBuffer),()=>{
        console.log("Uploaded file successfully")
        res("/images/"+fileName);
      });
  
    })
    
}


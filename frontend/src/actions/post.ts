import { CreatePostQuery, deletePostQuery } from "@/query/query";
import { HandleFileUpload } from "./upload";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const BACKEND_URL = "http://localhost:8000";

//delete post

export async function deletePostAction(formData:FormData){
    "use server"
    const query = deletePostQuery();
    const id = formData.get("id");
    
    const res = await fetch(BACKEND_URL,{
        method:"POST",
        body:JSON.stringify({
            query,
            variables:{
                id: parseInt(id as string)
            }
        }),
        headers:{
            "Content-Type":"application/json"
        }
    });
   // revalidatePath("/")
  //  revalidatePath("/categories/*")
    redirect("/")
    const data = await res.json();
    console.log(data.data);
   
    


}
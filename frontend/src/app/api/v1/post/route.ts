import { HandleFileUpload } from "@/actions/upload";
import { BACKEND_URL } from "@/constants";
import { CreatePostQuery } from "@/query/query";
import { generateFailedResponse, generateSuccessResponse } from "@/utils/response";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

async function POST(req:NextRequest){
    
    const formData = await req.formData();
    const file  = formData.get("image");
    const url = await HandleFileUpload(file as File);

    const query= CreatePostQuery()
    console.log(query);
    const {userId} = auth();
    if(!userId){
        return generateFailedResponse("User must be logged in!");
    }

    const res = await fetch(BACKEND_URL,{
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            query,
            variables:{
                title:formData.get("title") as string,
                excerpt:formData.get("excerpt") as string,
                content:formData.get("content") as string,
                category:parseInt(formData.get("category") as string),
                imageUrl:url,
                featured:false,
                userId
            }
        })
    })
    const data=  await res.json();
    console.log(data);
   // revalidatePath("/");
    redirect(`/post/${data.data.createBlogPost.id}`)
    return generateSuccessResponse(url);




}

export {POST}
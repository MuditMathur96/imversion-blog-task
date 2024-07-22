import { HandleFileUpload } from "@/actions/upload";
import { generateSuccessResponse } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";


async function POST(req:NextRequest){
    
    const formData = await req.formData();
    const file  = formData.get("file");
    const url = await HandleFileUpload(file as File);

    return generateSuccessResponse(url);




}

export {POST}
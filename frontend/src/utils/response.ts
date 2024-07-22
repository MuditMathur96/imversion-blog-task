import { NextResponse } from "next/server";

export function generateSuccessResponse(data:any){
    return NextResponse.json({
        result:true,
        data

    })
}

export function generateFailedResponse(message:string){
    return NextResponse.json({
        result:false,
        error:message

    })
}
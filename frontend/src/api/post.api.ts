import { BACKEND_URL } from "@/constants";
import { getPostByIdQuery, getPostsByCategoryQuery, getPostsQuery } from "@/query/query";

export async function getPosts(pageNumber:number=1,pageSize:number=5)
:Promise<any>{
    console.log("called");
    const query = getPostsQuery();
    
    const res =await fetch(BACKEND_URL,{
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            query,
            variables:{
                pageNumber,
                pageSize
            }
        }),
    });
    const data = await res.json();
    return data.data.getPosts;



}

export async function getPostById(id:number)
:Promise<any>{

    const query = getPostByIdQuery();
    
    const res =await fetch(BACKEND_URL,{
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            query,
            variables:{
                id
            }
        }),
    });

    const data = await res.json();
    console.log(data);
    return data?.data?.getPostById;



}

export async function getPostByCategory(id:number,pageNumber:number=1)
:Promise<any>{

    const query = getPostsByCategoryQuery();
    console.log(id,pageNumber);
    console.log(query);
    const body=JSON.stringify({
        query,
        variables:{
            category:id || undefined,
            pageNumber: pageNumber
        }
    });
    console.log(body);

    const res =await fetch(BACKEND_URL,{
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            query,
            variables:{
                category:id || undefined,
                pageNumber: pageNumber
            }
        }),
    });

    const data = await res.json();
    console.log(data);
    return data?.data?.getPostsByCategory;



}
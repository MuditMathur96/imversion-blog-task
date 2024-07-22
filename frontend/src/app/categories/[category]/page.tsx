import { getPosts } from '@/api/post.api'
import Pagination from '@/components/pagination/pagination'
import Post from '@/components/post/post'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

type Props = {
  params:{category:number}
}



async function Page({params}: Props) {

  return redirect(`/categories/${params.category}/1`);


}

export default Page
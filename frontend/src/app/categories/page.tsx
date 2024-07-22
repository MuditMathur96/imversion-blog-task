import { getPosts } from '@/api/post.api'
import Pagination from '@/components/pagination/pagination'
import Post from '@/components/post/post'
import { CATEGORIES } from '@/constants'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export const dynamic = "force-dynamic";

type Props = {
  params:{page:number}
}



async function Page() {

  return redirect("/categories/all/1")
}

export default Page
import { SignIn } from '@clerk/nextjs'
import React from 'react'

type Props = {}

function Page({}: Props) {
  return (
    <div
     className='flex items-center justify-center p-2 md:p-16 lg:p-32'
    >

        <SignIn />
    </div>
  )
}

export default Page
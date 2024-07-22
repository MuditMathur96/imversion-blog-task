"use client"
import Link from 'next/link'
import React from 'react'

type Props = {}

function Error({}: Props) {
  return (
    <div 
    className='h-[400px] w-full 
    flex justify-center items-center
    text-2xl
    '
    >
        Something went wrong while displaying the post! 
        <Link 
        className='underline'
        href="/"
        > Go to home page</Link>
    </div>
  )
}

export default Error
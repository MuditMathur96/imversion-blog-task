import React from 'react'
import NavLink from './navlink'
import Link from 'next/link'
import MobileNav from './mobile-nav'
import routes from './routes'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs'
import { Pen } from 'lucide-react'

type Props = {}

function Navbar({}: Props) {
  return (
    <div
     className='h-20 w-full
     flex items-center justify-between px-4
     '
    >

     
        {/* Icon */}
        <Link href="/">
        <p className='font-bold text-2xl
        bg-gradient-to-br from-green-500 to-blue-500 text-transparent
        bg-clip-text
        '>TrendTales</p>
        </Link>
        {/* Items */}

        <div className='hidden md:flex items-center gap-8 text-md'>
            {
              routes.map(r=><NavLink key={r.href} title={r.title} href={r.href} />)
            }
        </div>

        {/* Auth Components */}
        <div className='flex gap-2 items-center justify-end w-1/4 '>
            <ClerkLoading>
              <div 
              className='w-6 h-6 border-t-2 border-slate-500 rounded-full animate-spin' />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                  <div 
                  className='flex items-center justify-center gap-4'
                  >
                    <Link
                    href={"/post/create"}
                    >
                      <div 
                      className='flex items-center justify-center gap-2'
                      >
                        <Pen className='w-4 h-4'/>
                        <p className='hidden md:block'>Create Post</p>
                      </div>
                    </Link>
                  <UserButton  />
                  </div>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in">Sign In</Link>
              </SignedOut>
            </ClerkLoaded>
            
            <div className='block md:hidden mr-8'>
                <MobileNav />
            </div>
            
        </div>
    </div>
  )
}

export default Navbar
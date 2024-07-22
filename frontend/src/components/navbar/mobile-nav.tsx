"use client"
import React, { useState } from 'react'
import NavLink from './navlink';
import routes from './routes';

type Props = {}

function MobileNav({}: Props) {
    const [open,setOpen] = useState<boolean>(false);
  return (
    <div>
        {/* Hamburger */}
        <div 
        onClick={()=>setOpen(prev=>!prev)}
        className='flex flex-col gap-[4.6px] cursor-pointer
        absolute top-[28px] right-[22px] z-[10]'>
            <div className={`w-6 h-1 rounded-sm bg-black 
                ${open?"rotate-45":""} origin-left duration-200 `}/>
            <div className={`w-6 h-1  rounded-sm bg-black 
                ${open?"opacity-0":""} duration-200 `}/>
            <div className={`w-6 h-1 rounded-sm bg-black 
                ${open?"-rotate-45":""} origin-left duration-200 `}/>
        </div>
        {/* Menu */}
       {open &&<div 
        className='md:hidden bg-white inset-0 h-screen w-screen fixed z-[9]'>
                <div className='h-full w-full flex flex-col justify-center items-center gap-8'>
                    {
                        routes.map(r=>{
                            return (<div key={r.href} onClick={()=>setOpen(prev=>!prev)}>
                            <NavLink title={r.title} href={r.href} />
                            </div>)
                        })
                    }
                    
                </div>
        </div>}
    </div>
  )
}

export default MobileNav
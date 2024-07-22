import Link from 'next/link'
import React from 'react'

type Props = { title:string,href:string}

function NavLink({title,href}: Props) {
  return (
    <Link href={href}>{title}</Link>
  )
}

export default NavLink
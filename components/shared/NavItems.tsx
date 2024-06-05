"use client"
import { navlinks } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItems = () => {
  const currpath = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-6 md:flex-row">
      {
        navlinks.map((link) => {
          const isActive = currpath === link.url;
          return (
            <li key={link.url} className={`${isActive ? 'text-primary-500' : 'text-black'} flex-center p-medium-16 whitespace-nowrap`}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}

export default NavItems
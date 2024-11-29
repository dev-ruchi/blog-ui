import React from 'react'
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";   

const Navbar = () => {
  return (
   
       <div className="navbar shadow-lg mb-2">
          <div className="flex-1">
            <Link href="/posts" className="btn btn-ghost normal-case text-xl">
              My Blog
            </Link>
          </div>
          <div className="flex-none">
            <ThemeSwitcher />
          </div>
        </div>
   
  )
}

export default Navbar;

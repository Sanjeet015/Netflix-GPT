import React from 'react'
import logo from "../assets/LOGO.png"
function Header() {
  return (
    <div className='absolute px-8 py-2 bg-linear-to-b from-black z-10'>
       <img className='w-48' src={logo} alt="Netflix-LOGO" />
    </div>
  )
}

export default Header
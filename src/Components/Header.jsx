import React from 'react'
import logo from "../assets/LOGO.png"
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
  const navigate = useNavigate();
  
  const user = useSelector(store => store.user);
  const handleSignout=()=>{
    
    signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/")
      }).catch((error) => {
        // An error happened.
        navigate("/error")
      });
  }
  return (
    <div className='absolute top-0 left-0 z-10 flex w-full items-center justify-between bg-linear-to-b from-black px-8 py-4'>
       <img className='w-44' src={logo} alt="Netflix-LOGO" />

       {user && <div className='flex flex-col items-center gap-1'>
        <img className='w-8 h-8 rounded' src={user?.photoURL} alt="user icon" />
        <button className='text-white text-sm hover:underline' onClick={handleSignout}>(Sign Out)</button>
       </div>}
    </div>
  )
}

export default Header
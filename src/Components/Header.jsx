import React, { useEffect } from 'react'
import logo from "../assets/LOGO.png"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const user = useSelector(store => store.user);
  const handleSignout=()=>{
    
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        navigate("/error")
      });
  }

  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const {uid,email,displayName,photoURL} = user;
      dispatch(addUser({uid:uid,email:email,displayName:displayName || "User",photoURL: USER_AVATAR}))
      // ...
      navigate("/browse")
    } else {
      // User is signed out
      dispatch(removeUser())
      navigate("/")
    }
  });
// Unsubscibe when component unmount
return ()=> unsubscribe();

},[])

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
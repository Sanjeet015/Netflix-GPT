import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = ()=>{

  const [isSignIn,setIsSignIn]=useState(true)
  const [errorMessage,setErrorMessage]=useState("")
  const name=useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null)
  const dispatch = useDispatch()
   

  const handleButtonClick = ()=>{
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current?.value;
    
    let msg = checkValidateData(email.current.value,passwordValue);

    if(!isSignIn && passwordValue !== confirmPasswordValue){
      msg="Password does not match";
    }
    setErrorMessage(msg);
    // console.log(msg);

    if(msg) return;

    //Sign in Sign up logic

    if(!isSignIn){
      //Sign up
      createUserWithEmailAndPassword(auth, email.current.value, passwordValue)
        .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(user, {
      displayName: name.current.value})
        .then(() => {
          // Profile updated!
          const {uid,email,displayName,photoURL} = auth.currentUser;
             dispatch(
              addUser({uid:uid,email:email,displayName:displayName,photoURL: photoURL})
             )
        }).catch((error) => {
          // An error occurred
          setErrorMessage(error.message)
        });
      // console.log(user);
      // ...
      })
        .catch((error) => {
          setErrorMessage(error.code+"-"+error.message)
          // ..
        });
    }else{
      signInWithEmailAndPassword(auth, email.current.value, passwordValue)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
         if(error.code) setErrorMessage("Invalid Credential");
        });
    }
  }

  const toggleSignIn = ()=>{
    setIsSignIn(!isSignIn)
    setErrorMessage("")
  }
  return (
    <div>
     <Header/>
     <div className="absolute">
      <img className="w-full h-full object-cover" src={BG_URL} alt="Background-image" />
     </div>

     <form onSubmit={(e)=>e.preventDefault()} action="" className="absolute left-0 right-0 mx-auto my-36 w-5/12 bg-black/70 text-center rounded-sm">
      <h1 className="text-3xl font-bold text-left px-16 text-white pb-8">{isSignIn?"Sign In":"Sign Up"}</h1>
      {!isSignIn && <input ref={name} type="text" placeholder="Full Name" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white  border border-gray-400 rounded-sm"/>
      }
      <input ref={email} type="email" placeholder="Email Address" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white  border border-gray-400 rounded-sm"/>
      <input ref={password} type="password" placeholder="Password" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white border border-gray-400 rounded-sm"/>
      {!isSignIn && <input ref={confirmPassword} type="password" placeholder="Confirm Password" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white border border-gray-400 rounded-sm"/>}
      <p className="text-red-500 px-16 my-4 text-left font-bold text-lg pt-4">{errorMessage}</p>
      <button className="w-9/12 p-2 my-8 bg-red-700  rounded-sm cursor-pointer" onClick={handleButtonClick}>{isSignIn?"Sign In":"Sign Up"}</button>

      <p className="text-white px-16 my-4 text-left cursor-pointer" onClick={toggleSignIn}>{isSignIn?"New to Netflix?Sign up now.":"Already an user?Sign in now."}</p>
     </form>
    </div>
  )
}

export default Login 
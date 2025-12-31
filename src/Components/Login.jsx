import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate"

const Login = ()=>{

  const [isSignIn,setIsSignIn]=useState(true)
  const [errorMessage,setErrorMessage]=useState("")
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleButtonClick = ()=>{
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current?.value;
    
    let msg = checkValidateData(email.current.value,passwordValue);

    if(!isSignIn && passwordValue !== confirmPasswordValue){
      msg="Password does not match";
    }
    setErrorMessage(msg);
    console.log(msg);
  }

  const toggleSignIn = ()=>{
    setIsSignIn(!isSignIn)
  }
  return (
    <div>
     <Header/>
     <div className="absolute">
      <img className="" src="https://assets.nflxext.com/ffe/siteui/vlv3/f86b16bf-4c16-411c-8357-22d79beed09c/web/IN-en-20251222-TRIFECTA-perspective_d4acb127-f63f-4a98-ad0b-4317b0b3e500_large.jpg" alt="Background-image" />
     </div>

     <form onSubmit={(e)=>e.preventDefault()} action="" className="absolute py-12 mx-auto bg-black/80 w-5/12 my-36 text-center m-auto left-0 right-0">
      <h1 className="text-3xl font-bold text-left px-16 text-white pb-8">{isSignIn?"Sign In":"Sign Up"}</h1>
      {!isSignIn && <input type="text" placeholder="Full Name" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white  border border-white rounded-sm"/>
      }
      <input ref={email} type="email" placeholder="Email Address" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white  border border-white rounded-sm"/>
      <input ref={password} type="password" placeholder="Password" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white border border-white rounded-sm"/>
      {!isSignIn && <input ref={confirmPassword} type="text" placeholder="Confirm Password" className="w-9/12 p-4 m-2 cursor-pointer bg-black/90
      text-white border border-white rounded-sm"/>}
      <p className="text-red-500 px-17 my-4 text-left font-bold text-lg pt-4">{errorMessage}</p>
      <button className="w-9/12 p-2 my-8 bg-red-700  rounded-sm cursor-pointer" onClick={handleButtonClick}>{isSignIn?"Sign In":"Sign Up"}</button>

      <p className="text-white px-17 my-4 text-left cursor-pointer" onClick={toggleSignIn}>{isSignIn?"New to Netflix?Sign up now.":"Already an user?Sign in now."}</p>
     </form>
    </div>
  )
}

export default Login 
import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const passwordValue = password.current.value;
    const confirmPasswordValue = confirmPassword.current?.value;

    let msg = checkValidateData(email.current.value, passwordValue);

    if (!isSignIn && passwordValue !== confirmPasswordValue) {
      msg = "Password does not match";
    }

    setErrorMessage(msg);
    if (msg) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, passwordValue)
        .then(({ user }) => {
          updateProfile(user, {
            displayName: name.current.value,
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
          });
        })
        .catch((error) => setErrorMessage(error.message));
    } else {
      signInWithEmailAndPassword(auth, email.current.value, passwordValue)
        .catch(() => setErrorMessage("Invalid credentials"));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-50">
        <img className="w-full h-full object-cover" src={BG_URL} alt="Background" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start px-4 pt-28 pb-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-black/70 rounded-sm p-8 text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 bg-black/90 text-white border border-gray-400 rounded-sm"
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="w-full p-3 mb-4 bg-black/90 text-white border border-gray-400 rounded-sm"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-black/90 text-white border border-gray-400 rounded-sm"
          />

          {!isSignIn && (
            <input
              ref={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 mb-4 bg-black/90 text-white border border-gray-400 rounded-sm"
            />
          )}

          {errorMessage && (
            <p className="text-red-500 font-semibold mb-4">{errorMessage}</p>
          )}

          <button
            type="button"
            onClick={handleButtonClick}
            className="w-full bg-red-700 hover:bg-red-800 text-white p-3 rounded-sm font-semibold"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="text-gray-300 mt-6 cursor-pointer"
            onClick={() => {
              setIsSignIn(!isSignIn);
              setErrorMessage("");
            }}
          >
            {isSignIn
              ? "New to Netflix? Sign up now."
              : "Already a user? Sign in now."}
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;

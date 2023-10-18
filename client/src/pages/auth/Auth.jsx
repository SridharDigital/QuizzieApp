import { useState, useEffect } from "react"
import style from "./Auth.module.css"

import Signup from "./Signup"
import Login from "./Login"

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div className={style.authContainer}>
      <div className={style.authContentBox}>
        <h1 className={style.logo}>Quizzie</h1>
        <div className={style.btnContainer}>
          <button
            className={`${style.authBtn} ${isSignup ? style.btnActive : null}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </button>
          <button
            className={`${style.authBtn} ${!isSignup ? style.btnActive : null}`}
            onClick={() => setIsSignup(false)}
          >
            Log In
          </button>
        </div>
        {isSignup ? <Signup /> : <Login />}
      </div>
    </div>
  )
}

export default Auth

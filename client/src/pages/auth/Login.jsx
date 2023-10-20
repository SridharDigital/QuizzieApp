import { useState, useEffect } from "react"
import style from "./Auth.module.css"

import { callApi } from "../../utils/callApi"

const initialAdminValues = {
  email: "",
  password: "",
}
const Login = () => {
  const [admin, setAdmin] = useState(initialAdminValues)
  const [errors, setErrors] = useState({})

  const handleBlur = (event) => {
    const fieldName = event.target.name
    const inputValue = event.target.value

    if (inputValue === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "This field cannot be left empty",
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: false,
      }))
    }
  }

  const handleInput = (event) => {
    const fieldName = event.target.name
    const inputValue = event.target.value

    setAdmin((prevUser) => ({
      ...prevUser,
      [fieldName]: inputValue,
    }))
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault()
    setErrors({})
    const isFormValid = validateFormData()

    if (isFormValid) {
      const response = await callApi("POST", "/login", admin)
      console.log(response)
      setAdmin(initialAdminValues)
      if (response.status === "FAIL") {
        setErrors({ apiError: response.message })
      }
      //   } else {
      //     dispatch(loginUser(response.data))
      //     navigate("/")
      //   }
    }
  }

  const validateFormData = () => {
    let isFormValid = true
    const formFields = Object.keys(admin)

    formFields.forEach((field) => {
      if (!admin[field]) {
        isFormValid = false
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "This field cannot be left empty",
        }))
      }
    })

    return isFormValid
  }
  return (
    <form onSubmit={handleSubmitForm} className={style.loginFormContainer}>
      <div className={style.formFieldContainer}>
        <label className={style.formLabel} htmlFor="inputName">
          Email
        </label>
        <input
          name="email"
          type="text"
          id="inputName"
          className={`${style.inputBar} ${
            errors.email ? style.inputError : null
          }`}
          placeholder={errors.email ? "Invalid Email" : null}
          value={admin.email}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={style.formFieldContainer}>
        <label className={style.formLabel} htmlFor="inputName">
          Password
        </label>
        <input
          name="password"
          type="password"
          id="inputName"
          className={`${style.inputBar} ${
            errors.password ? style.inputError : null
          }`}
          placeholder={errors.password ? errors.password : null}
          value={admin.password}
          onInput={handleInput}
          onBlur={handleBlur}
        />
        {errors.apiError ? (
          <p className={style.apiAuthError}>{errors.apiError}</p>
        ) : null}
      </div>
      <div className={style.submitBtnContainer}>
        <button type="submit" className={style.submitBtn}>
          Log In
        </button>
      </div>
    </form>
  )
}

export default Login

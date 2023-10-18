import { useState, useEffect } from "react"
import style from "./Auth.module.css"

const initialAdminValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}
const Signup = () => {
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

    // if (isFormValid) {
    //   const apiResponse = await sendRequest("POST", "/register", user)
    //   setAdmin(initialAdminValues)

    //   if (apiResponse.status === "FAILURE") {
    //     setErrors({ apiError: apiResponse.message })
    //   } else {
    //     dispatch(loginUser(apiResponse.data))
    //     redirectToDashboard()
    //   }
    // }
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

    if (admin.confirmPassword !== admin.password) {
      setAdmin((prevUser) => ({
        ...prevUser,
        confirmPassword: "",
      }))
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "password doesn’t match",
      }))
    }

    return isFormValid
  }

  return (
    <form onSubmit={handleSubmitForm} className={style.SignupFormContainer}>
      <div className={style.formFieldContainer}>
        <label className={style.formLabel} htmlFor="inputName">
          Name
        </label>
        <input
          name="name"
          type="text"
          id="inputName"
          className={`${style.inputBar} ${
            errors.name ? style.inputError : null
          }`}
          placeholder={errors.name ? "Invalid name" : null}
          value={admin.name}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
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
          placeholder={errors.password ? "Weak password" : null}
          value={admin.password}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={style.formFieldContainer}>
        <label className={style.formLabel} htmlFor="inputName">
          Confirm Password
        </label>
        <input
          name="confirmPassword"
          type="password"
          id="inputName"
          className={`${style.inputBar} ${
            errors.confirmPassword ? style.inputError : null
          }`}
          placeholder={errors.confirmPassword ? "password doesn’t match" : null}
          value={admin.confirmPassword}
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
      <div className={style.submitBtnContainer}>
        <button type="submit" className={style.submitBtn}>
          Sign-Up
        </button>
      </div>
    </form>
  )
}

export default Signup

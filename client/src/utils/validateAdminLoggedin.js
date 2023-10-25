import Cookies from "js-cookie"

export const validateAdminLoggedin = () => {
  const isUserLoggedIn = Cookies.get("jwt_token")
  if (isUserLoggedIn) {
    return true
  } else {
    return false
  }
}

import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { validateAdminLoggedin } from "../utils/validateAdminLoggedin"

const initialState = {
  isAdminLoggedIn: validateAdminLoggedin(),
  adminId: Cookies.get("adminId"),
}

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      Cookies.set("jwt_token", action.payload.jwtToken, {
        expires: 30,
        path: "/",
      })
      Cookies.set("adminId", action.payload.admin.id, {
        expires: 30,
        path: "/",
      })
      state.adminId = action.payload.admin.id
      state.isAdminLoggedIn = validateAdminLoggedin()
    },
    logoutAdmin: (state) => {
      Cookies.remove("jwt_token", { path: "/" })
      Cookies.remove("adminId", { path: "/" })
      console.log("logoutAdmin action is executed")
      state.isAdminLoggedIn = validateAdminLoggedin()
    },
  },
})

export const { loginAdmin, logoutAdmin } = adminSlice.actions

export default adminSlice.reducer

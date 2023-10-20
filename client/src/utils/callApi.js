import axios from "axios"

const BASE_URL = "https://quizzie-api.onrender.com/api"

export const callApi = async (method, url, params) => {
  try {
    if (method === "GET") {
      const { data } = await axios.get(BASE_URL + url, { params })
      return data
    } else if (method === "POST") {
      const { data } = await axios.post(BASE_URL + url, params)
      return data
    }
  } catch (error) {
    return error.response.data
  }
}

// export const callApi = async (method, url, params) => {
//   //   const jwtToken = Cookies.get("jwt_token")
//   try {
//     const response = await axios({
//       method: "post",
//       url: "/user/12345",
//       data: params,
//     })

//     return response
//   } catch (error) {
//     return error.response
//   }
// }

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { store } from "./store/store"
import { Provider } from "react-redux"

import "./App.css"

import Auth from "./pages/auth/Auth"
import Dashboard from "./pages/dashboard/Dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App

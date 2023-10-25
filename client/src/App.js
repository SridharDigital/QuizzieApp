import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"

import Auth from "./pages/auth/Auth"
import Dashboard from "./pages/dashboard/Dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

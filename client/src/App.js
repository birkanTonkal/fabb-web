import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./components/Dashboard"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
      </Routes>
    </div>
  )
}

export default App
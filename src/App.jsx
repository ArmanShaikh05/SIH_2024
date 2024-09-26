import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./styles/app.scss"
import AppLayout from "./layout/AppLayout"
import Dashboard from "./pages/Dashboard/Dashboard"

const App = () => {
  return (
    <Router>

      <Routes>

        <Route  element={<AppLayout />} >

        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />

        </Route>


      </Routes>

    </Router>
  )
}

export default App
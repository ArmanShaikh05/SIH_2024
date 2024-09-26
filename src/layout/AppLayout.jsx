import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"
import "./applayout.scss"
import Sidebar from "../components/Sidebar/Sidebar"

const AppLayout = () => {
  return (
    <div className="StyledAppLayout">
      <Header />
      <Sidebar />
        <main className="Main">
            <div className="Container">
                <Outlet />
            </div>
        </main>
    </div>
  )
}

export default AppLayout
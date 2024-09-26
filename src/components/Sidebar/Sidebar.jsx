import "./sidebar.scss";
import { Avatar } from "../../assets";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="StyledSidebar">
      <div className="StyledLogo">
        <img className="Img" src={Avatar} alt="Avatar" />
      </div>

      <ul className="NavList">
        <li>
          <Link className="StyledNavLink" to={"/dashboard"}>
            <HiOutlineHome />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link className="StyledNavLink" to={"/bookings"}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </Link>
        </li>

        <li>
          <Link className="StyledNavLink" to={"/cabins"}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </Link>
        </li>

        <li>
          <Link className="StyledNavLink" to={"/users"}>
            <HiOutlineUsers />
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link className="StyledNavLink" to={"/settings"}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

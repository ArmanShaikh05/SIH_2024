import "./header.scss";
import UserAvatar from "../../ui/UserAvatar/UserAvatar";
import {
  HiOutlineUser,
  HiOutlineMoon,
  HiOutlineSun,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMOde] = useState(true);

  return (
    <header className="StyledHeader">
      <UserAvatar />

      <ul className="StyledHeaderMenu">
        <li>
          <button className="ButtonIcon">
            <HiOutlineUser />
          </button>
        </li>
        <li>
          <button
            className="ButtonIcon"
            onClick={() => setIsDarkMOde(!isDarkMode)}
          >
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
        </li>

        <li>
          <button className="ButtonIcon">
            <HiArrowRightOnRectangle />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;

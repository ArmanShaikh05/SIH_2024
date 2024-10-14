import "./sidebar.scss";
import { Avatar } from "../../assets";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "../../redux/authSlice";
import { setPosts, setSelectedPost } from "../../redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import CreatePost from '../CreatePost';
import { HiOutlineSearch, HiOutlineBell, HiOutlinePlus } from "react-icons/hi";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === 'Profile') {
      navigate(`/profile/${user?._id}`);
    } else if (textType === 'Home') {
      navigate("/");
    } else if (textType === 'Messages') {
      navigate("/chat");
    } else if (textType === 'Search') {
      navigate("/search"); // Navigate to search page
    }
  };

  return (
    <div className="StyledSidebar text-black">
      <div className="StyledLogo">
        <img className="Img" src={Avatar} alt="Avatar" />
      </div>

      <ul className="NavList">
        <li onClick={() => sidebarHandler("Home")}>
          <Link className="StyledNavLink" to={"/"}>
            <HiOutlineHome />
            <span>Home</span>
          </Link>
        </li>
        <li onClick={() => sidebarHandler("Search")}>
          <Link className="StyledNavLink" to={"/search"}>
            <HiOutlineSearch />
            <span>Search</span>
          </Link>
        </li>
        <li onClick={() => sidebarHandler("Messages")}>
          <Link className="StyledNavLink" to={"/chat"}>
            <HiOutlineCalendarDays />
            <span>Chat</span>
          </Link>
        </li>
        <li onClick={() => sidebarHandler("Profile")}>
          <Link className="StyledNavLink" to={`/profile/${user?._id}`}>
            <HiOutlineCalendarDays />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link className="StyledNavLink" to={"/account/edit"}>
            <HiOutlineCalendarDays />
            <span>Edit Profile</span>
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
        <li onClick={() => sidebarHandler("Logout")}>
          <Link className="StyledNavLink" to="#">
            <HiOutlineCog6Tooth />
            <span>Logout</span>
          </Link>
        </li>
      </ul>

      {/* Notifications Button */}
      {likeNotification.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600">
              <HiOutlineBell /> {likeNotification.length}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              {likeNotification.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                likeNotification.map((notification) => (
                  <div key={notification.userId} className="flex items-center gap-2 my-2">
                    <img src={notification.userDetails?.profilePicture} alt="Profile" className="w-6 h-6 rounded-full" />
                    <p className="text-sm">
                      <span className="font-bold">{notification.userDetails?.username}</span> liked your post
                    </p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Create Post Button */}
      <Button onClick={() => setOpen(true)} className="mt-4">
        <HiOutlinePlus /> Create Post
      </Button>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;


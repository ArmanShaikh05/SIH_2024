import { Avatar } from "../../assets"
import "./useravatar.scss"

const UserAvatar = () => {
  return (
    <div className="StyledUserAvatar">
        <img className="Avatar" src={Avatar} alt="Avatar" />
        <span>fullName</span>
    </div>
  )
}

export default UserAvatar
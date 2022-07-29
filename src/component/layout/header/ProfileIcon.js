import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import UserIcon from "../../common/UserIcon";
import { Link } from "react-router-dom";
import defaultUserPic from "../../../asset/img/user.png";

function ProfileIcon() {
  const { user } = useContext(AuthContext);
  return (
    <Link
      to={`/profile/${user.id}`}
      className="rounded-pill p-1 d-flex align-items-center text-decoration-none hover-bg-gray-200"
    >
      <UserIcon size="28" src={user.profilePic || defaultUserPic} />
      <span className="ms-2 text-dark fw-bold me-1 text-3.5">
        {user.firstName + " " + user.lastName}
      </span>
    </Link>
  );
}

export default ProfileIcon;

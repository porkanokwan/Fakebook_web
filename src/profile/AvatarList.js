import UserIcon from "../component/common/UserIcon";
import { useNavigate } from "react-router-dom";

function AvatarList({ friends }) {
  const navigate = useNavigate();
  return (
    <div className="pt-1 mb-3">
      {friends.slice(0, 8).map((el, index) => (
        <span
          key={el.id}
          className={index ? "-ms-2" : ""}
          onClick={() => navigate("/profile/" + el.id)}
          role="button"
        >
          <UserIcon src={el.profilePic} border="2" size="32" />
        </span>
      ))}
    </div>
  );
}

export default AvatarList;

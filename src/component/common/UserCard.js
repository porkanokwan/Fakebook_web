import defaulProfilePic from "../../asset/img/user.png";

function UserCard({ profilePic }) {
  return (
    <img
      src={profilePic || defaulProfilePic}
      className="card-img-top rounded-t-lg"
      alt="user"
    />
  );
}

export default UserCard;

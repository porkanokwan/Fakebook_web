import UserCard from "../common/UserCard";
import { Link, useLocation } from "react-router-dom";
import axios from "../../config/axios";

function FriendCard({
  friends: { id, firstName, lastName, profilePic },
  fetchData,
}) {
  const { pathname } = useLocation();

  const handleClickAddFriend = async () => {
    try {
      await axios.post("/friends", { request_to_id: id });
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  //   const handleClickDeleteFriend = async () => {
  //     try {
  //       await axios.delete("/friends/" + "id");
  //       await fetchData();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const handleClickAcceptFriend = async () => {
    try {
      await axios.patch("/friends/" + id, { status: "accepted" });
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card shadow rounded-lg ">
        <UserCard profilePic={profilePic} />
        <div className="card-body">
          <Link
            className="card-title hover-underline text-decoration-none text-dark"
            role="button"
            to={`/profile/${id}`}
          >
            {firstName} {lastName}
          </Link>
          <div className="d-grid gap-2">
            {pathname === "/friends/request" ? (
              <>
                <button
                  className="btn btn-primary text-3.5"
                  onClick={handleClickAcceptFriend}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-gray-200 text-3.5"
                  onClick={() => console.log("Delete friends")}
                >
                  Delete
                </button>
              </>
            ) : pathname === "/friends/suggestion" ? (
              <button
                className="btn btn-primary text-3.5"
                onClick={handleClickAddFriend}
              >
                Add Friend
              </button>
            ) : (
              <button
                className="btn btn-primary text-3.5"
                // onClick={handleClickDeleteFriend}
              >
                Delete Friend
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;

import { useContext, useState } from "react";
import UserIcon from "../component/common/UserIcon";
import { AuthContext } from "../contexts/AuthContext";
import AvatarList from "./AvatarList";
import ModalProfile from "./ModalProfile";

function ProfileDetails({
  userProfile: { id, profilePic, firstName, lastName, friends, friendStatus },
}) {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  let mode = "unknown";
  if (id === user.id) {
    mode = "me";
  } else if (friendStatus) {
    if (friendStatus.status === "accepted") {
      mode = "accepted";
    } else if (friendStatus.request_to_id === user.id) {
      mode = "pending";
    } else {
      mode = "request";
    }
  } else {
    mode = "unknown";
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center align-items-md-stretch mx-auto px-3 max-w-266 space-x-4">
      <div className="-mt-20 -mt-md-10 z-10">
        <UserIcon src={profilePic} size="168" border="4" />
      </div>

      <div className="mt-3 flex-grow-1 d-flex flex-column align-items-center d-md-block">
        <h2 className="fw-bold mb-0">
          {firstName} {lastName}
        </h2>
        <span className="d-inline-block text-muted pt-1">
          {friends.length} Friends
        </span>
        {friends.length && <AvatarList friends={friends} />}
      </div>

      <div className="d-flex align-items-end mb-3">
        {mode === "accepted" && (
          <>
            <button className="btn btn-gray-200" onClick={() => setOpen(true)}>
              <i className="fa-solid fa-user-minus" /> Delete Friend
            </button>
          </>
        )}
        {mode === "pending" && (
          <>
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              <i className="fa-solid fa-check" /> Accept Friend
            </button>
            <button
              className="btn btn-secondary ms-3"
              onClick={() => setOpen(true)}
            >
              <i className="fa-solid fa-xmark" /> Delete Friend
            </button>
          </>
        )}
        {mode === "request" && (
          <>
            <button
              className="btn btn-secondary ms-3"
              onClick={() => setOpen(true)}
            >
              <i className="fa-solid fa-xmark" /> Cancle Request
            </button>
          </>
        )}
        {mode === "unknown" && (
          <>
            <button className="btn btn-gray-200" onClick={() => setOpen(true)}>
              <i className="fa-solid fa-user-plus" /> Add Friend
            </button>
          </>
        )}
        {mode === "me" && (
          <>
            <button className="btn btn-gray-200" onClick={() => setOpen(true)}>
              <i className="fa-solid fa-pen" /> Edit Profile
            </button>
            <ModalProfile open={open} onClose={() => setOpen(false)} />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;

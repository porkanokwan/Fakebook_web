import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserIcon from "../common/UserIcon";
import Modal from "../ui/Modal";
import PostForm from "./form/PostForm";

function NewPostBox() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="border bg-white rounded-lg shadow-sm px-3 tw-py-3">
      <div className="d-flex space-x-2">
        <Link to={`/profile/${user.id}`}>
          <UserIcon src={user.profilePic} size="40" />
        </Link>
        <button
          className="btn btn-gray-200 rounded-pill text-muted flex-1 text-start"
          onClick={() => setOpen(true)}
        >
          What's on your mind, {user.firstName}?
        </button>

        <Modal open={open} onClose={onClose} title="Create Post">
          <PostForm open={open} onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
}

export default NewPostBox;

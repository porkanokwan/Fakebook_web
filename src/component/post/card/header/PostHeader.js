import { Link } from "react-router-dom";
import { timeSince } from "../../../../service/dateFormat";
import UserIcon from "../../../common/UserIcon";
import Modal from "../../../ui/Modal";
import { useState } from "react";
import PostForm from "../../form/PostForm";
import { deletePost } from "../../../../api/post";
import { usePost } from "../../../../contexts/PostContext";
import { deletePostAction } from "../../../../action/postAction";

function PostHeader({ post }) {
  const [open, setOpen] = useState(false);
  const {
    User: { id, profilePic, firstName, lastName },
    createdAt,
  } = post;
  const { dispatch } = usePost();

  const onClose = () => setOpen(false);

  const handleClickDeletePost = async () => {
    try {
      await deletePost(post.id);
      dispatch(deletePostAction({ postId: post.id }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex align-items-center space-x-2">
      <Link to={`/profile/${id}`}>
        <UserIcon src={profilePic} size="40" />
      </Link>
      <div className="d-flex flex-column flex-fill">
        <Link
          to={`/profile/${id}`}
          className="text-dark fw-bold no-underline hover-underline text-3.5"
        >
          {firstName} {lastName}
        </Link>
        <small className="text-muted text-3">{timeSince(createdAt)}</small>
      </div>
      <button
        className="btn rounded-circle h-9 w-9 position-relative hover-bg-gray-200 shadow-none"
        data-bs-toggle="dropdown"
      >
        <i className="fa-solid fa-ellipsis text-muted position-absolute top-50 left-50 translate-middle" />
      </button>
      <div className="dropdown-menu dropdown-menu-end">
        <button
          className="dropdown-item"
          type="button"
          onClick={() => setOpen(true)}
        >
          Edit
        </button>
        <button
          className="dropdown-item"
          type="button"
          onClick={handleClickDeletePost}
        >
          Delete
        </button>
      </div>

      <Modal open={open} onClose={onClose} title="Edit Post">
        <PostForm post={post} open={open} onClose={onClose} />
      </Modal>
    </div>
  );
}

export default PostHeader;

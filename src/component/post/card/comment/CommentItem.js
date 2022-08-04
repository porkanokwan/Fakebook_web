import { Link } from "react-router-dom";
import UserIcon from "../../../common/UserIcon";
import { timeSince } from "../../../../service/dateFormat";
import { useAuth } from "../../../../contexts/AuthContext";
import { deleteComment, updateComment } from "../../../../api/post";
import { usePost } from "../../../../contexts/PostContext";
import {
  deleteCommentAction,
  updateCommentAction,
} from "../../../../action/postAction";
import { useState } from "react";
import CommentBox from "../../../common/CommentBox";
import { useError } from "../../../../contexts/ErrorContext";

function CommentItem({ comment, postId }) {
  const { user } = useAuth();
  const { dispatch } = usePost();
  const {
    User: { id, firstName, lastName, profilePic },
    updatedAt,
    title,
    id: commentId,
  } = comment;
  const [inputEdit, setInputEdit] = useState(false);
  const [titleComment, setTitleComment] = useState(title);
  const { setError } = useError();

  const handleClickDelete = async () => {
    try {
      await deleteComment(commentId, postId);
      dispatch(deleteCommentAction({ commentId, postId }));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleClickEdit = () => {
    setInputEdit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateComment(commentId, titleComment);
      console.log(res);
      dispatch(
        updateCommentAction({ postId, commentId, comment: res.data.comments })
      );
      setInputEdit(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="d-flex">
      <Link to={"/profile/" + id}>
        <UserIcon src={profilePic} size="32" />
      </Link>

      {inputEdit ? (
        <>
          <CommentBox
            id={id}
            profilePic={profilePic}
            titleComment={titleComment}
            onChange={(e) => setTitleComment(e.target.value)}
            handleSubmit={handleSubmit}
          />
          <button
            className="btn text-danger text-align-center hover-underline shadow-none"
            type="button"
            onClick={() => setInputEdit(false)}
          >
            cancle
          </button>
        </>
      ) : (
        <div className="d-flex flex-column ms-2">
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column align-items-start tw-py-2 tw-px-3 bg-gray-200 rounded-2xl">
              <Link
                to={"/profile/" + id}
                className="text-dark text-3 fw-bold no-underline hover-underline"
              >
                {firstName} {lastName}
              </Link>
              <small>{title}</small>
            </div>

            {user.id === id && (
              <div className="dropdown ms-1">
                <button
                  className="btn rounded-circle h-8 w-8 position-relative hover-bg-gray-200 shadow-none"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-ellipsis text-muted position-absolute top-50 left-50 translate-middle" />
                </button>
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleClickEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleClickDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="text-muted ms-2 text-3">{timeSince(updatedAt)}</span>
        </div>
      )}
    </div>
  );
}

export default CommentItem;

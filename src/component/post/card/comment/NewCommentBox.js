import { useAuth } from "../../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import UserIcon from "../../../common/UserIcon";
import { useState } from "react";
import { createComment } from "../../../../api/post";
import { useError } from "../../../../contexts/ErrorContext";
import { usePost } from "../../../../contexts/PostContext";
import { createCommentAction } from "../../../../action/postAction";

function NewCommentBox({ postId }) {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const { id, profilePic } = user;
  const { setError } = useError();
  const { dispatch } = usePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createComment(comment, postId);
      dispatch(
        createCommentAction({ postId, user, comment: res.data.comment })
      );
      setComment("");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="d-flex pt-1">
      <Link to={"/profile/" + id}>
        <UserIcon src={profilePic} size="32" />
      </Link>
      <form className="flex-grow-1 ms-2" onSubmit={handleSubmit}>
        <input
          className="form-control rounded-pill ms-2 shadow-none border-0 bg-gray-200 focus-bg-gray-200 h-9 text-3.5"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  );
}

export default NewCommentBox;

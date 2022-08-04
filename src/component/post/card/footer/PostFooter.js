import { useState } from "react";
import CommentContainer from "../comment/CommentContainer";
import PostFeedback from "./PostFeedback";
import PostResponse from "./PostResponse";

function PostFooter({ post }) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const showComment = () => {
    setShow(true);
  };

  return (
    <>
      <PostFeedback toggleShow={toggleShow} post={post} />
      <hr className="hr-sm my-0" />
      <PostResponse showComment={showComment} post={post} />
      {show && <CommentContainer post={post} />}
    </>
  );
}

export default PostFooter;

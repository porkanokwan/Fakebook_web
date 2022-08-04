import CommentItem from "./CommentItem";

function CommentList({ comments, postId }) {
  return (
    <div className="pt-2 d-flex flex-column space-y-1">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
}

export default CommentList;

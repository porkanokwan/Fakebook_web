function CommentBox({ titleComment, onChange, handleSubmit }) {
  return (
    <div className="d-flex pt-1 flex-grow-1 ">
      <form className="flex-grow-1 ms-2" onSubmit={handleSubmit}>
        <input
          className="form-control rounded-pill ms-2 shadow-none border-0 bg-gray-200 focus-bg-gray-200 h-9 text-3.5"
          placeholder="Write a comment..."
          value={titleComment}
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default CommentBox;

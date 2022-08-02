function PostBody({ post: { title, postPic } }) {
  return (
    <div className="tw-mt-3">
      {title && <p className="text-3.5 mb-0">{title}</p>}
      {postPic && (
        <div className="-px-4 mt-3">
          <img src={postPic} alt="post" className="img-fluid" />
        </div>
      )}
    </div>
  );
}

export default PostBody;

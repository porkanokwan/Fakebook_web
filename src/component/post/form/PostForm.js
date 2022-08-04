import { useContext, useEffect, useState } from "react";
import { createPost, updatePost } from "../../../api/post";
import { ErrorContext } from "../../../contexts/ErrorContext";
import { AuthContext } from "../../../contexts/AuthContext";
import SaveButton from "./SaveButton";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import { validatePost } from "../../../validate/Validate";
import Spinner from "../../common/Spinner";
import { usePost } from "../../../contexts/PostContext";
import { updatePostAction } from "../../../action/postAction";

function PostForm({ open, onClose, post }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [postPic, setPostPic] = useState("");
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(ErrorContext);
  const { dispatch } = usePost();

  const handleClickSavePost = async () => {
    try {
      setLoading(true);
      // validate
      validatePost(title, postPic, setError);
      if (post) {
        const res = await updatePost(title, postPic, post.id);
        console.log(res);
        dispatch(updatePostAction({ postId: post.id, newPost: res.data.post }));
      } else {
        await createPost(title, postPic);
      }
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTitle(post?.title || title);
    setPostPic(post?.postPic || postPic);
  }, [open]);

  return (
    <>
      {loading && <Spinner />}
      <TextArea
        onChange={(e) => setTitle(e.target.value)}
        firstName={user.firstName}
        title={title}
      />
      <UploadImage
        onChange={(e) => {
          if (e.target.files[0]) {
            setPostPic(e.target.files[0]);
          }
        }}
        value={postPic}
        onDelete={() => setPostPic("")}
      />
      <SaveButton onClick={handleClickSavePost} />
    </>
  );
}

export default PostForm;

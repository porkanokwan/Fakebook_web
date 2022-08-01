import { useContext, useEffect, useState } from "react";
import { createPost } from "../../../api/post";
import { ErrorContext } from "../../../contexts/ErrorContext";
import { AuthContext } from "../../../contexts/AuthContext";
import SaveButton from "./SaveButton";
import TextArea from "./TextArea";
import UploadImage from "./UploadImage";
import { validatePost } from "../../../validate/Validate";
import Spinner from "../../common/Spinner";

function PostForm({ open, onClose }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [postPic, setPostPic] = useState("");
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(ErrorContext);

  const handleClickSavePost = async () => {
    try {
      setLoading(true);
      // validate
      validatePost(title, postPic, setError);
      await createPost(title, postPic);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTitle("");
    setPostPic("");
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

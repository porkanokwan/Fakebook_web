import React, { createContext, useContext, useEffect, useReducer } from "react";
import { initPost } from "../action/postAction";
import { getAllPost } from "../api/post";
import postReducer, { initial } from "../reducer/postReducer";

const PostContext = createContext();

function PostContextProvider({ children }) {
  const [{ posts }, dispatch] = useReducer(postReducer, initial);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getAllPost();
        dispatch(initPost(res.data.posts));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, []);

  return (
    <PostContext.Provider value={{ posts, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;

// Custome Hook สามารถเรียกใช้ Hook ได้เหมือน Function Component แค่ขึ้นต้นด้วย use ตามด้วยอะไรก็ได้
function usePost() {
  const ctx = useContext(PostContext);
  return ctx;
}

export { usePost };

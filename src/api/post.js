import axios from "../config/axios";

export const createPost = (title, postPic) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("post_pic", postPic);
  return axios.post("/posts", formData);
};

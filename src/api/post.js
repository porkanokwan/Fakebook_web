import axios from "../config/axios";

export const createPost = (title, postPic) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("post_pic", postPic);
  return axios.post("/posts", formData);
};

export const updatePost = (title, postPic, postId) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("post_pic", postPic);
  return axios.patch(`/posts/${postId}`, formData);
};

export const deletePost = (post_id) => {
  return axios.delete(`/posts/${post_id}`);
};

export const getAllPost = () => {
  return axios.get("/users/posts");
};

export const createComment = (title, postId) => {
  return axios.post(`/comment/${postId}`, { title });
};

export const deleteComment = (comment_id, post_id) => {
  return axios.delete(`/comment/${comment_id}/post/${post_id}`);
};

export const createLike = (post_id) => {
  return axios.post(`/posts/${post_id}/like`);
};

export const deleteLike = (post_id) => {
  return axios.delete(`/posts/${post_id}/like`);
};

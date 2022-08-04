export const INIT = "init";
export const CREATE_COMMENT = "createComment";
export const DELETE_COMMNET = "deleteComment";
export const UPDATE_POST = "updatePost";
export const DELETE_POST = "deletePost";

export const initPost = (payload) => ({
  type: INIT,
  payload,
});

export const createCommentAction = (payload) => ({
  type: CREATE_COMMENT,
  payload,
});

export const deleteCommentAction = (payload) => ({
  type: DELETE_COMMNET,
  payload,
});

export const updatePostAction = (payload) => ({
  type: UPDATE_POST,
  payload,
});

export const deletePostAction = (payload) => ({
  type: DELETE_POST,
  payload,
});

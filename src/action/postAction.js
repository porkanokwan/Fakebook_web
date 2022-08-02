export const INIT = "init";
export const CREATE_COMMENT = "createComment";

export const initPost = (payload) => ({
  type: INIT,
  payload,
});

export const createCommentAction = (payload) => ({
  type: CREATE_COMMENT,
  payload,
});

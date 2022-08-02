import { INIT, CREATE_COMMENT } from "../action/postAction";

export const initial = {
  posts: [],
  comment: {},
};

export default function postReducer(state, action) {
  switch (action.type) {
    // dispatch({ type: 'init', payload: [] })
    case INIT: {
      return { ...state, posts: action.payload };
    }
    // payload {postId, user, comment}
    case CREATE_COMMENT: {
      // Backend ไม่ได้ส่ข้อมูล user มา แก้ได้ 2 วิธี 1.แก้ที่ Backend 2.แก้ที่ Frontend ให้รับข้อมูล user เพิ่ม แล้วยัดเข้า state
      const idx = state.posts.findIndex(
        (el) => el.id === action.payload.postId
      );
      const newComment = [...state.posts[idx].Comments];
      newComment.push({ ...action.payload.comment, User: action.payload.user });
      const newPost = [...state.posts];
      newPost[idx] = { ...newPost[idx], Comments: newComment };
      return { ...state, posts: newPost };
    }
    default:
      return state;
  }
}

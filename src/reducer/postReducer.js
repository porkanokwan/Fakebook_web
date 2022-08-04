import {
  INIT,
  CREATE_COMMENT,
  DELETE_COMMNET,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_COMMNET,
} from "../action/postAction";

export const initial = {
  posts: [],
  // commentMapping: { postId: [comments] }
  commentMapping: {},
};

export default function postReducer(state, action) {
  switch (action.type) {
    // dispatch({ type: 'init', payload: [] })
    case INIT: {
      // Deep Cloning
      const commentMapping = action.payload.reduce((acc, el) => {
        acc[el.id] = el.Comments;
        return acc;
      }, {});
      return { ...state, posts: action.payload, commentMapping };
    }

    // payload {postId, user, comment}
    case CREATE_COMMENT: {
      // Backend ไม่ได้ส่ข้อมูล user มา แก้ได้ 2 วิธี 1.แก้ที่ Backend 2.แก้ที่ Frontend ให้รับข้อมูล user เพิ่ม แล้วยัดเข้า state
      // Shallow Cloning : Cloning ชั้นบนสุด แต่ชั้นที่ซ้อนอยู่ไม่ถูก Clone
      // const idx = state.posts.findIndex(
      //   (el) => el.id === action.payload.postId
      // );
      // const newComment = [...state.posts[idx].Comments];
      // newComment.push({ ...action.payload.comment, User: action.payload.user });
      // const newPost = [...state.posts];
      // newPost[idx] = { ...newPost[idx], Comments: newComment };
      // return { ...state, posts: newPost };

      // Deep Cloning
      const newComments = [...state.commentMapping[action.payload.postId]];
      newComments.push({
        ...action.payload.comment,
        User: action.payload.user,
      });
      return {
        ...state,
        commentMapping: {
          ...state.commentMapping,
          [action.payload.postId]: newComments,
        },
      };
    }

    case UPDATE_COMMNET: {
      const newComment = [...state.commentMapping[action.payload.postId]];
      const idx = newComment.findIndex(
        (el) => el.id === action.payload.commentId
      );
      newComment[idx] = { ...action.payload.comment };
      return {
        ...state,
        commentMapping: {
          ...state.commentMapping,
          [action.payload.postId]: newComment,
        },
      };
    }

    case DELETE_COMMNET: {
      const newComments = [
        ...state.commentMapping[action.payload.postId],
      ].filter((el) => el.id !== action.payload.commentId);
      return {
        ...state,
        commentMapping: {
          ...state.commentMapping,
          [action.payload.postId]: newComments,
        },
      };
    }

    case UPDATE_POST: {
      // payload { postId, newPost }
      const idx = state.posts.findIndex(
        (el) => el.id === action.payload.postId
      );
      const newPost = [...state.posts];
      newPost[idx] = {
        ...action.payload.newPost,
        Comments: [...state.posts[idx].Comments],
        Likes: [...state.posts[idx].Likes],
      };
      return {
        ...state,
        posts: newPost,
      };
    }

    case DELETE_POST: {
      // payload { postId }
      const newPosts = [...state.posts].filter(
        (el) => el.id !== action.payload.postId
      );
      return { ...state, posts: newPosts };
    }
    default:
      return state;
  }
}

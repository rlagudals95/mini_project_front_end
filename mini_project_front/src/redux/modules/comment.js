// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import axios from "axios";
// import { history } from "../configureStore";

// import "moment";
// import moment from "moment";

// const SET_COMMENT = "SET_COMMENT";

// const setComment = createAction(SET_COMMNET, (comment_list, post_id) => ({
//   comment_list,
//   post_id,
// }));

// const initailState = {
//   list: [],
//   is_loading,
// };

// const getCommnetAX = (post_id = null) => {
//   return function (getState, dispatch, { history }) {
//     if (!post_id) {
//       return;
//     }

//     axios.get(`${config.api}/api/comments/${post_id}`).then((res) => {
//       let comment_list = [];
//       res.data.forEach((_post) => {
//         let comment = {
//           // 어떤식으로 서버에서 받을까요~?
//         };
//         comment_list.unshift(comment);
//       });
//     });
//   };
// };

// const addCommentAX = () => {
//   return function (getstate, dispatch, { history }) {
//     let _comment = {
//       // 코멘트 데이터 방식
//     };
//     axios
//       .post(`${config.api}/api/comments/${post_id}`, {
//         ..._comment,
//       })
//       .then((res) => {
//         let comment_list = { ...comment, id: res.data.id };

//         dispatch(addComment(comment_list, post_id));
//       })
//       .catch((err) => {
//         console.log("댓글작성에러:", err);
//         window.alert("댓글작성에러!");
//       });
//   };
// };

// export default handleActions(
//   {
//     [SET_COMMENT]: (state, action) =>
//       produce(state, (draft) => {
//         //포스트id에 맞는 comment_list를 줘야하기 때문에 이렇게 해주는거 알쥬~?
//         draft.list[action.payload.post_id] = action.payload.comment_list;
//       }),
//   },
//   initailState
// );

// const actionCreators = {
//   setComment,
// };

// export { actionCreators };

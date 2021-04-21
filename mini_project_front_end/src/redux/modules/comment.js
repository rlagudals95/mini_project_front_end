import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (comment_list, post_id) => ({
  comment_list,
  post_id,
}));

const addComment = createAction(ADD_COMMENT, (comment, post_id) => ({
  comment,
  post_id,
}));

const editComment = createAction(EDIT_COMMENT, (comment) => ({ comment }));

const deleteComment = createAction(DELETE_COMMENT, (id, post_id) => ({
  id,
  post_id,
}));

const loading = createAction(LOADING, (comment) => ({ comment }));

const initialState = {
  list: [],
  is_loading: false,
};

// addCommentAX는 댓글과 댓글 단 사람의 정보 해당 게시글 정보를 담아서 서버에 보내는 작업을 합니다.
// 그리고 리덕스 store에 그 정보들을 저장해서 바로 화면으로 새로적은 댓글이 보이게 합니다.

const addCommentAX = (comment, post_id, token) => {
  return function (dispatch, getState, { history }) {
    console.log(comment); //
    console.log(post_id); // 이건 포스트 id 그대로 189같은 숫자
    console.log(token);
    // let _comment = {
    //   username: comment.user_name, // 유저네임 받아온것
    //   content: comment.comment, // 댓글 받아온 것
    // };
    // console.log(_comment);
    //코멘트 아이디를 post_id와 같게 설정해서 어떤 포스트에 쓴 댓글이다를 판별하는 것 같다
    // 거기에 어떤 유저가 쓴지 구별하기 위해서 user_id 혹은 토큰 같은 값을 보내주고
    axios({
      method: "POST",
      url: `http://3.34.48.76/api/comment/${post_id}`,
      data: {
        ...comment,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        //응답이 온다
        console.log("애드코멘트", res);

        let comment_list = { ...comment, id: res.data.id };
        // console.log(comment_list);
        dispatch(addComment(comment_list, post_id)); //코멘트 리스트 받아온 값과 포스트 id값을 애드코멘트에 보낸다
        history.replace("/boastdog");
        // window.location.reload();
      }) // 여기서 받아온 코멘트 리스트와 post_id를  애드 코멘트 리듀서로 돌린다
      .catch((err) => {
        console.log(err.response);
        window.alert("댓글 작성에 문제가 있어요!");
      });
  };
};

// 화면을 리로드를 했을 때 리덕스 store에 있는 정보들이 다 날아가기 때문에
// DB에 저장해뒀던 해당 게시물의 댓글 정보들을 response로 받아서 다시 리덕스 store에 저장합니다.

const getCommentAX = (post_id) => {
  return function (dispatch, getstate) {
    if (!post_id) {
      return;
    }
    console.log(post_id);
    axios
      .get(`http://3.34.48.76/api/comment/${post_id}`)
      .then((response) => {
        console.log(response);
        let comment_list = [];
        response.data.forEach((_post) => {
          // 포스트 내용이 다오는데 빼서 쓰자!!
          console.log(response.data);
          let comment = {
            comment: _post.comment,
            username: _post.nickname,
            comment_dt: _post.article.createdAt,
            id: _post.article.id, // 포스트 id
            comment_id: _post.id,
          };
          comment_list.unshift(comment);
        });
        console.log(comment_list);
        dispatch(setComment(comment_list, post_id));
        console.log(comment_list); // 해당 댓글의 모든 댓글의 정보가 나온다
        // dispatch(setComment(comment_list, post_id));
      })
      .catch((error) => {
        window.alert("댓글을 불러올 수 없습니다.");
      });
  };
};

// 해당 댓글 id값을 서버에 보내서 삭제를 시킵니다.
// 리덕스 store에서도 같은 id값을 가진것을 찾아서 삭제 시킵니다.

const deleteCommentAX = (id, post_id, token) => {
  // 댓글 아이디와 포스트 아이디
  // console.log("댓글 id", id);
  // console.log("포스트 id", post_id);
  // console.log("토큰", token);
  return function (dispatch, getState) {
    axios({
      method: "DELETE",
      url: `http://3.34.48.76/api/comment/${id}`, //post_id 포스트 id?
      // data: {
      //   post_id,
      // },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      window.alert("댓글 삭제 완료!");
      window.location.reload();
      // console.log("댓글삭제 res", res);
      // dispatch(deleteComment(id, post_id));
    });
    // .catch((err) => {
    //   window.alert("댓글 삭제에 문제가 있어요!");
    // });
  };
};

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        //  draft.list[action.payload.post_id] 안에 아무것도 없는 상태이면 배열도 없는 상태여서
        // unshift도 되지 않습니다. 그래서 아무것도 없는 경우일 때를 따로 설정했습니다.
        if (!draft.list[action.payload.post_id]) {
          draft.list[action.payload.post_id] = [action.payload.comment];
          return;
        } //댓글이 없다면? 그냥 대체 해주는 거죠??
        draft.list[action.payload.post_id].unshift(action.payload.comment_list);
        // 어떤 포스트의 댓글 배열 안에 새로 받은 코멘트를 넣어줍니다
        //원래 이니셜 스테이트에 1맨 앞에 댓글 추가
      }),
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // console.log(action.payload.post_id); // 여기 포스트 id숫자가 같다
        // console.log("페이로드 리스트", action.payload.comment_list); //여기 id와
        // 받은 포스트 아이디 번째의 list를 새로운 코멘트 리스트로 교체해준다 우리도 포스트 id가 0,1,2,3,4,5니까 쉽게 할 수 있을 것 같다
        // draft.list[action.payload.post_id] = action.payload.comment_list;
        draft.list = action.payload.comment_list;
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list[action.payload.post_id].findIndex(
          (p) => p.id === action.payload.id
        ); //음 어떤 포스트에서 썼고 어떤 유저가 쓴거야?? 를 id를 받아서 찾는다
        //현재 이니셜 스테이트의 list안의 댓글들 중에서 찾는다 받은 댓글의 id와 같은 친구를
        if (idx !== -1) {
          // 만약 그런 댓글이 있다면?? // 지금 댓글 배열에서
          draft.list[action.payload.post_id].splice(idx, 1); //idx위치의 항목 1개를 삭제한다
          // 받은 포스트 아이디 순번의 리스트(댓글 배열에서) 받은 id 를 삭제해준다!
        }
      }),
  },
  initialState
);

const actionCreators = {
  addCommentAX,
  getCommentAX,
  deleteCommentAX,
};

export { actionCreators };

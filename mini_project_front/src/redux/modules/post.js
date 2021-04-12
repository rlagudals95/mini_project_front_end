import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";
const EDIT_LIKE = "EDIT_LIKE";

console.log(config.api);
console.log(`${config.api}/article`);
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (id) => ({ id }));
const loading = createAction(LOADING, (loading) => ({ loading }));
const editLike = createAction(EDIT_LIKE, (post, post_id) => ({
  post,
  post_id,
}));

const initialState = {
  list: [],
  is_loading: false,
};

const initialPost = {
  contents: "",
  user_name: "",
  insert_dt: "",
  post_image_url: "",
  profile_image_url: "",
  user_id: "",
  like_cnt: 0,
  like_id: [], // like_id는 배열로 만들어서 배열 수만큼 like_cnt 그리고 배열안에 현재 접속유저 유뮤를 파악해 하트 모양결정
};

const getPostAX = () => {
  return function (getState, dispatch, { history }) {
    axios
      .get(`${config.api}/api/article`)
      .then((res) => {
        let post_list = [];

        res.data.forEach((_post) => {
          console.log(_post);
          let post = {
            id: _post.id,
            title: _post.title,
            insert_dt: _post.createdAt,
            user_name: _post.username,
            post_image_url: _post.imgUrl,
            user_id: _post.userId,
            content: _post.content,
          };

          post_list.unshift(post);
        });
        dispatch(setPost(post_list));
      })
      .catch((err) => {
        window.alert("게시물 불러오기 실패");
        console.log(err);
      });
  };
};

const addPostAX = (post) => {
  return function (getState, dispatch, { history }) {
    //user 먼저 만들자!
  };
};

const deletePostAX = (id) => {
  return function (dispatch, getState) {
    axios
      .delete(`${config.api}/article/${id}`)
      .then((res) => {
        dispatch(deletePost(id));
        history.replace("/");
      })
      .catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!");
      });
  };
};

const editLikeAX = (post, post_id) => {
  return function (getState, dispatch, { history }) {
    axios
      .put(`${config.api}/article/like/${post_id}`, {
        ...post,
      })
      .then((response) => {
        let _post = {
          like_id: post.likeId,
          like_cnt: post.likeCnt,
        };
        dispatch(editLike(_post, post_id));
      });
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post);
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return; // acc는 어레이 맨처음 딕셔너리 그리고 cur을 그뒤의 딕셔너리
            //여기서 acc는 계속 변한다 어떻게? 뒤의 1,2,3 번째 딕셔너리가 붙은채로
            //그렇다면 acc 첫번째 딕셔너리 안의 포스트id 중에 뒤에 id가 같은 것이 있다 없다를 검가
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur; //cur 새롭게 추가하는 것
            //겹치는 포스트 아이디가 있다면?

            return acc;
          }
        }, []);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            //다른것만 리턴 시켜라 이말인가???
            return [...draft.list, r];
          }
        });
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  setPost,
  getPostAX,
  deletePostAX,
  editLikeAX,
};

export { actionCreators };

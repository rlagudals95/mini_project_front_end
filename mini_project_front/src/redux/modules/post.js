import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";
import { storage } from "../../shared/firebase";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const LOADING = "LOADING";
const DELETE_POST = "DELETE_POST";
const EDIT_LIKE = "EDIT_LIKE";

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
  return function (dispatch, getState, { history }) {
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

const addPostAX = (contents) => {
  return function (dispatch, getState, { history }) {
    // let formData = new FormData();
    // formData.append("file", file);
    // formData.append("contents", contents);

    const _image = getState().image.preview;
    console.log(contents);
    console.log("프리뷰는", _image);
    const option = {
      url: "http://15.164.211.60/api/article",
      method: "POST",
      data: {
        Article: "null",
        title: "null",
        username: "null",
        content: contents,
        imgurl: _image,
      },
    };
    axios(option).then((response) => {
      console.log(response);
    });
  };
};

// const addPostAX = (contents) => {
//   return function (dispatch, getState) {
//     const _image = getState().image.preview;
//     //이런식으로 파이어베이스 스토리지를 이용해 전송해주는 방식도 있구나!
//     const _upload = storage
//       .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
//       .putString(_image, "data_url");

//     _upload.then((snapshot) => {
//       snapshot.ref
//         .getDownloadURL()
//         .then((url) => {
//           axios
//             .post("http://15.164.211.60/api/article", {
//               Article: "null",
//               title: "null",
//               username: "null",
//               content: contents,
//               imgurl: url,
//             })
//             .then((response) => {
//               console.log(response);
// let post_list = {
//   id: response.data.id,
//   post_image_url: url,
//   ...user_info,
//   contents: post.contents,
//   insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
//   like_cnt: 0,
//   like_id: [],
// };
// dispatch(addPost(post_list));
// dispatch(
//   imageActions.setPreview("http://via.placeholder.com/400x300")
// );
// history.replace("/");
//             });
//         })
//         .catch((error) => {
//           console.log(error);
//           window.alert("게시물 저장이 정상적으로 되지 않았습니다.");
//         });
//     });
//   };
// };

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
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = action.payload.post_list;
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(...action.payload.post);
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
  addPostAX,
  getPostAX,
  deletePostAX,
  editLikeAX,
};

export { actionCreators };

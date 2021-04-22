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
const EDIT_POST = "EIDT_POST";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
})); //여기서 페이징을 안해주니까 안나왔다 ㅜㅜ
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (id) => ({ id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const editLike = createAction(EDIT_LIKE, (post, post_id) => ({
  post, //포스트는 user_id부터 post_id ,like_id 같은 모든정보
  post_id,
}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialState = {
  list: [],
  is_loading: true,
  paging: { start: null, size: 6 }, //start가 왜 인식이 안돼냐 ㅠㅠ
  // user: { user_id: "hmk" }
};

const initialPost = {
  contents: "",
  user_name: "",
  insert_dt: "",
  post_image_url: "",
  user_id: "",
  like_cnt: 0,
  like_id: [], // like_id는 배열로 만들어서 배열 수만큼 like_cnt 그리고 배열안에 현재 접속유저 유뮤를 파악해 하트 모양결정
};

const getPostAX = (start = null, size = null) => {
  return function (dispatch, getState, { history }) {
    axios
      .get("http://3.34.48.76/api/article")
      .then((res) => {
        // console.log(res);
        let result = res.data.slice(start, size); // 서버에서 받은 데이터를 함수 인자값으로 받은 start와 size 값으로 슬라이스
        if (result.length === 0) {
          //불러온 게시물이 끝났다면 return;
          dispatch(loading(false)); // 로딩 중이면 스피너를 보여주게 설정해줘도 되겠구나
          return;
        }
        console.log(result);
        let paging = {
          start: start + result.length + 1,
          size: size + 5,
        };

        // console.log(result);

        let post_list = [];

        result.forEach((_post) => {
          console.log(_post);
          let post = {
            id: _post.id,
            insert_dt: _post.createdAt,
            nickname: _post.nickname,
            post_image_url: _post.imgUrl,
            user_id: _post.userId,
            content: _post.content,
            like_id: _post.likeId,
          };
          post_list.unshift(post);
        });
        dispatch(setPost(post_list, paging));
      })
      .catch((err) => {
        window.alert("게시물 불러오기 실패");
        console.log(err);
      });
  };
};

const addPostAX = (contents, token) => {
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;

    console.log(token);

    const user_info = {
      nickname: _user.nickname,
    };

    console.log(user_info.nickname);
    console.log(contents);

    let _post = {
      content: contents,
      nickname: user_info.nickname,
      likeCnt: 0,
      likeId: [],
    };

    const _image = getState().image.preview;

    const _upload = storage //파이어 베이스 스토리지 이용해서 img_url 뽑아내는 방법
      .ref(`image/dog_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          axios({
            method: "POST",
            url: `http://3.34.48.76/api/article`,
            data: {
              ..._post,
              imgUrl: url,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            history.push("/boastdog");
            // console.log(response);
            window.location.reload();
          });
        })
        .catch((error) => {
          console.log(error);
          window.alert("게시물 저장이 정상적으로 되지 않았습니다.");
        });
    });
  };
};

const editLikeAX = (post, post_id, token) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "PUT",
      url: `http://3.34.48.76/api/article/${post_id}`,
      data: {
        ...post,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      // console.log(response);
      let _post = {
        like_id: post.likeId,
        like_cnt: post.likeCnt,
      }; //응답으론 라이크 id[ 유저 아이디가 들어있는배열], 라이크 카운트 받자
      dispatch(editLike(_post, post_id));
    });
  };
};

const editPostAX = (post_id, post, token) => {
  //
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      window.alert("게시물 정보가 없어요!");
      return;
    }
    const _image = getState().image.preview; // 수정할 이미지 가져오기
    const _post_idx = getState().post.list.findIndex((p) => p.id == post_id); //게시글 목록중 현재 수정 게시글과 같은순번은?
    const _post = getState().post.list[_post_idx]; //순번찾았으니 게시글 목록중에 선택해주기

    console.log(_post);

    let _edit = {
      likeId: post.likeId,
      likeCnt: post.likeCnt,
      content: post.contents, //like_id // like_Cnt
    };
    if (_image == _post.post_image_url) {
      //인식안됨
      // 이미지말고 콘텐츠만 수정되었을 때
      // console.log("컨텐츠만 수정됨");
      axios({
        method: "PUT",
        url: `http://3.34.48.76/api/article/${post_id}`,
        data: {
          ..._edit,
          imgUrl: _image,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        // console.log(response);
        // dispatch(editPost(post_id, { ..._edit }));
        history.replace("/boastdog");
        window.location.reload();
      });
      return;
    } else {
      console.log("이미지도 수정됨");
      //컨텐츠와 이미지를 둘 다 수정할 때
      const username = getState().user.user.username;
      const _upload = storage
        .ref(`images/${username}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log("이미지 수정 포스트id", post_id);
          axios({
            method: "PUT",
            url: `http://3.34.48.76/api/article/${post_id}`,
            data: {
              ..._edit,
              imgUrl: url,
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            // let edit_list = { ..._edit, imgUrl: url };
            // dispatch(editPost(post_id, edit_list));
            history.replace("/boastDog");
            window.location.reload();
          });
        });
      });
    }
  };
};

const deletePostAX = (post_id, token) => {
  return function (dispatch, getState) {
    // console.log("게시물 삭제 포스트id", post_id);
    // console.log("게시물 삭제", token);
    axios({
      method: "DELETE",
      url: `http://3.34.48.76/api/article/${post_id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res);
        window.location.reload();
        // dispatch(deletePost(id));
        // history.replace("/boastdog");
      })
      .catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!");
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = action.payload.post_list;
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(...action.payload.post);
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((r, idx) => {
          if (r.id !== action.payload.id) {
            //받은 post_id와 같은 post는 제외하고 리턴 시켜라!
            return [...draft.list, r];
          }
        });
      }),
    [EDIT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // dispatch(editLike(_post, post_id));

        let idx = draft.list.findIndex((p) => {
          return p.id === action.payload.post_id; // list [a,b,c] // post_id = c >>
        }); //
        // console.log(idx); // post 순번을 찾는다
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        //원래 리스트에 페이로드로 들어온 리스트(새로 라이크 누른 아이디)가 들어오는 건가?
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
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
  editPostAX,
};

export { actionCreators };

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

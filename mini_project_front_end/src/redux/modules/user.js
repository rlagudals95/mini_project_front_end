import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import { config } from "../../shared/config";
import axios from "axios";
import { setCookie, deleteCookie } from "../../shared/Cookie";

const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";

const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user: "null",
  is_login: false,
};

const loginCheckAX = (token) => {
  return function (dispatch, getstate, { history }) {
    if (token) {
      // console.log(token);
      const option = {
        url: "http://3.34.48.76/api/check",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`, //Barear 값으로 보내라
        },
      };
      axios(option)
        .then((res) => {
          console.log("로그인 체크 넘어옴");
          console.log(res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          if (error.response) {
            window.alert(error.response.data.errorMessage);
          }
        });
    } else {
      dispatch(logOutAX());
    }
  };
};

const SignupAX = (email, nickName, password) => {
  return function (dispatch, getState, { history }) {
    axios
      .post("http://3.34.48.76/user/regist", {
        username: email,
        password: password,
        nickname: nickName,
      })
      .then((user) => {
        console.log(user);
        // dispatch(
        //   setUser({
        //     username: email,
        //     nickname: nickName,
        //   })
        // );
        history.push("/login");
      })
      .catch((err) => {
        window.alert("회원가입 에러");
        console.log("회원가입 에러:", err);
      });
  };
};

const LoginAX = (email, password) => {
  return function (dispatch, getState, { history }) {
    axios({
      method: "POST",
      url: "http://3.34.48.76/user/login",
      data: {
        username: email,
        password: password,
      },
    })
      .then((res) => {
        // console.log(res);
        // console.log(res.config.data);
        //  localStorage.setItem("token", res.data.token); //로컬에다가 토큰저장! res는 서버가 주는값
        setCookie("token", res.data.token); //만료일 3
        dispatch(setUser(res.config.data)); // 이게 맞나~? 닉네임 안받아도 되려나?
        // axios.defaults.headers.common["token"] = `Bearer ${token}`;
        history.push("/");
      })
      .then(() => {
        window.location.reload(); // 새로고침 해서 유저 App.js의 useEffect실행 유저정보 가져오기
      })
      .catch((err) => {
        window.alert("로그인 에러", err);
        console.log("로그인 에러:", err);
      });
  };
};

const logOutAX = () => {
  return function (dispatch) {
    dispatch(logOut());
    history.push("/login");
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("token");
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
);

const actionCreators = {
  SignupAX,
  logOutAX,
  LoginAX,
  logOutAX,
  loginCheckAX,
  setUser,
};

export { actionCreators };

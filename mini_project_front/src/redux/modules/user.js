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
  // user: null,
  user: {
    user_name: null,
    user_id: null,
  },

  is_login: false,
};

const SignupAX = (email, nickName, userName, password, passwordChk) => {
  return function (getState, dispatch, { history }) {
    window.alert("회원가입 연결중");
    axios({
      method: "POST",
      url: `${config}`,

      data: {
        email: email,
        nickName: nickName,
        userName: userName,
        password: password,
      },
    })
      .then((user) => {
        dispatch(
          setUser({
            email: email,
            nickName: nickName,
            userName: userName,
          })
        );
        //   history.push("/login")
      })
      .catch((err) => {
        window.alert("회원가입 에러");
        console.log("회원가입 에러:", err);
      });
  };
};

const LoginAX = (email, password) => {
  return function (getState, dispatch, { history }) {
    axios({
      method: "POST",
      url: `${config}/user/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        //  localStorage.setItem("token", res.data.token); //로컬에다가 토큰저장! res는 서버가 주는값
        //  setCookie(is_login, res.data.token)
        dispatch(setUser(email));
        // history.push("/")
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
        deleteCookie("is_login");
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
};

export { actionCreators };

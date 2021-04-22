import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

const SET_SHOWME = "SET_SHOWME";
const LOADING = "LOADING";

const setShowme = createAction(SET_SHOWME, (show_list, paging) => ({
  show_list,
  paging,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, size: 6 },
  is_loading: true,
};

const findDog = (dog, start = null, size = null) => {
  return function (dispatch, getState, { history }) {
    axios
      .post("http://3.34.48.76/api/Adoption/type", {
        type: dog === "미니어처푸들" ? "푸들" : dog,
      })
      .then((res) => {
        console.log("!!!!!!", res);
        let result = res.data.slice(start, size);
        if (result.length === 0) {
          //불러온 게시물이 끝났다면 return;
          dispatch(loading(false));
          return;
        }

        let paging = {
          start: start + result.length + 1,
          size: size + 5,
        };

        let show_list = [];

        result.forEach((_show) => {
          let show = {
            type: _show.type, //견종
            age: _show.age, //나이
            gender: _show.gender, //성별
            note: _show.note, // 특이사항
            fave: _show.fave, //좋아하는것
            image: _show.image, //이미지
            neuter: _show.neuter, //중성화 수술 여부
            reason: _show.reason, //보호샤유
            vaccine: _show.vaccine, //예방접종여부
          };
          show_list.unshift(show);
        });
        dispatch(setShowme(show_list, paging));
      })
      .catch((e) => console.error(e));
  };
};

const getShowmeAX = (start = null, size = null) => {
  return function (dispatch, getState, { history }) {
    axios
      .get("http://3.34.48.76/api/Adoption")
      .then((res) => {
        console.log(res);

        let result = res.data.slice(start, size);
        if (result.length === 0) {
          //불러온 게시물이 끝났다면 return;
          dispatch(loading(false));
          return;
        }

        let paging = {
          start: start + result.length + 1,
          size: size + 5,
        };

        let show_list = [];

        result.forEach((_show) => {
          let show = {
            type: _show.type, //견종
            age: _show.age, //나이
            gender: _show.gender, //성별
            note: _show.note, // 특이사항
            fave: _show.fave, //좋아하는것
            image: _show.image, //이미지
            neuter: _show.neuter, //중성화 수술 여부
            reason: _show.reason, //보호샤유
            vaccine: _show.vaccine, //예방접종여부
          };
          show_list.unshift(show);
        });
        dispatch(setShowme(show_list, paging));
      })
      .catch((err) => {
        window.alert("게시물 불러오기 실패:", err);
      });
  };
};

export default handleActions(
  {
    [SET_SHOWME]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.show_list);
        draft.paging = action.payload.paging;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getShowmeAX,
  findDog,
};

export { actionCreators };

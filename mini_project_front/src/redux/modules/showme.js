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

const getShowmeAX = (start = null, size = null) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`${config.api}/api/article`)
      .then((res) => {
        console.log(res);

        let result = res.data.slice(start, size);
        if (result.length === 0) {
          //불러온 게시물이 끝났다면 return;
          dispatch(loading(false));
          return;
        }
        console.log(result);
        let paging = {
          start: start + result.length + 1,
          size: size + 5,
        };

        let show_list = [];

        res.data.forEach((_show) => {
          let show = {
            title: _show.title,
            insert_dt: _show.insert_dt,
            img_url: _show.img_url,
            content: _show.content,
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
};

export { actionCreators };

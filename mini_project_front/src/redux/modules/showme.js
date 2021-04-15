import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { history } from "../configureStore";
import "moment";
import moment from "moment";
import { config } from "../../shared/config";

const SET_SHOWME = "SET_SHOWME";

const setShowme = createAction(SET_SHOWME, (show_list) => ({ show_list }));

const initialState = {
  list: [],
};

// const getShowmeAX = () => {
//   return function (dispatch, getState, { history }) {
//     axios
//       .get(`${config.api}/api/article`)
//       .then((res) => {
//         let show_list = [];

//         res.data.forEach((_show) => {
//           let show = {
//             title: _show.title,
//             insert_dt: _show.insert_dt,
//             img_url: _show.img_url,
//             content: _show.content,
//           };
//           show_list.unshift(show);
//         });
//         dispatch(setShowme(show));
//       })
//       .catch((err) => {
//         window.alert("게시물 불러오기 실패:", err);
//       });
//   };
// };

export default handleActions(
  {
    [SET_SHOWME]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.show_list);
      }),
  },
  initialState
);

const actionCreators = {
  //   getShowmeAX,
};

export { actionCreators };

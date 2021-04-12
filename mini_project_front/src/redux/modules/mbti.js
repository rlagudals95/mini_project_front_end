import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";

const SET_M = "SET_M";
const SET_B = "SET_B";
const SET_T = "SET_T";
const SET_I = "SET_I";

const setM = createAction(SET_M, (m) => ({ m }));
const setB = createAction(SET_B, (b) => ({ b }));
const setT = createAction(SET_T, (t) => ({ t }));
const setI = createAction(SET_I, (i) => ({ i }));

const initialState = {
  m: null,
  b: null,
  t: null,
  i: null,
};

const sumMbit = () => {
  return function (dispatch, getState, { history }) {
    console.log("hi");
  };
};

export default handleActions(
  {
    [SET_M]: (state, action) =>
      produce(state, (draft) => {
        draft.m = { ...draft.m, ...action.payload.m };
      }),
    [SET_B]: (state, action) =>
      produce(state, (draft) => {
        draft.m = { ...draft.b, ...action.payload.b };
      }),
    [SET_T]: (state, action) =>
      produce(state, (draft) => {
        draft.m = { ...draft.t, ...action.payload.t };
      }),
    [SET_I]: (state, action) =>
      produce(state, (draft) => {
        draft.m = { ...draft.i, ...action.payload.i };
      }),
  },
  initialState
);

const actionCreators = {
  setM,
  setB,
  setT,
  setI,
};

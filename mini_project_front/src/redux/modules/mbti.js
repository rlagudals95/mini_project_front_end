import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios'

const SET_QUESTION = 'SET_QUESTION'
const ADD_SCORE= "ADD_SCORE";
const SET_RESULT = 'SET_RESULT';
const IS_LOADING = 'IS_LOADING'
const loading = createAction(IS_LOADING, (is_loading) => ({ is_loading }));
const setQuestion = createAction(SET_QUESTION, (questions) => ({questions}));
const addScore = createAction(ADD_SCORE, (type, score) => ({ type, score }));
const setResult = createAction(SET_RESULT, (result) => ({ result }));
const initialState = {
  isLoading:false,
  questions:[],
  result:[
    {
      type:'M',
      score:[]
    },
    {
      type:'B',
      score:[]
    },

    {
      type:'T',
      score:[]
    },
    {
      type:'I',
      score:[]
    }

  ],
  type_data:[]
};

const q_list_API = 'http://3.34.48.76/api/mbti/start'
const getQuestionsAPI = () =>{
  return function(dispatch, getState, {history}){
    dispatch(loading(true));
    axios
      .get(q_list_API)
      .then((resp) => {
        dispatch(setQuestion(resp.data));
        dispatch(loading(false));
      })
      .catch((e) => console.error(e));  }
}

const totalResult = (result)=>{
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));

    let result_list = [0,0,0,0]
    for(let i = 0; i <result_list.length; i++){
        if(result[i].type === 'M'){
            result_list[0]+=Number(result[i].score.reduce((acc,cur) =>acc+cur, 0))}
        else if(result[i].type === 'B'){
            result_list[1]+=Number(result[i].score.reduce((acc,cur) =>acc+cur, 0))}
        else if(result[i].type === 'T'){
            result_list[2]+=Number(result[i].score.reduce((acc,cur) =>acc+cur, 0))}
        else if(result[i].type === 'I'){
            result_list[3]+=Number(result[i].score.reduce((acc,cur) =>acc+cur, 0))}
            if(result_list===[0,0,0,0]){
      
              history.push('/')
            }
    }

    axios({
      method: "POST",
      url: "http://3.34.48.76/api/mbti/result",
      headers: {
          "Accept": "application/json", //클라이언트가 서버한테 요청하는(원하는) 타입
          "Content-Type":"application/json;charset=UTF-8", //현재 서버한테 보내는 데이터 타입
          'Access-Control-Allow-Origin' : '*'
      },
      data: {
          "result_list":result_list,
      }
  }).then((resp)=>{
    dispatch(loading(false));
    history.push(`/result`)
    dispatch(setResult(resp.data))
  }).catch(error=>{
      console.log(error);
  });
    return

  }


}

export default handleActions(
  {
    [SET_QUESTION]: (state, action) =>
    produce(state, (draft) => {
      draft.questions = action.payload.questions
    }),
    [ADD_SCORE]: (state, action) =>
    produce(state, (draft) => {
      const idx = draft.result.findIndex((v) => v.type === action.payload.type)
      draft.result[idx].score.push(action.payload.score)
    }),
    [SET_RESULT]: (state, action) =>
    produce(state, (draft) => {
      draft.type_data = action.payload.result
    }),
    [IS_LOADING]: (state, action) =>
    produce(state, (draft) => {
    draft.isLoading = action.payload.is_loading;
  }),
  },
  initialState
);

const actionCreators = {
  
  getQuestionsAPI,
  setQuestion,
  addScore,
  totalResult,
  setResult
};

export { actionCreators };

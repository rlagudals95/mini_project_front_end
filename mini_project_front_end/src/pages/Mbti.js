import React, { useEffect, useState } from "react";
import ProgressBar from "../component/ProgressBar";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import { actionCreators as mbtiActions } from "../redux/modules/mbti";
import { useDispatch, useSelector } from "react-redux";
import BeforeResult from "./BeforeResult";

const Mbti = (props) => {
  const dispatch = useDispatch();
  const qdata = useSelector((state) => state.mbti.questions);
  const isLoading = useSelector((state) => state.mbti.isLoading);
  const [num, setNum] = useState(0);

  console.log(qdata); // 질문을 한번에 리덕스로 가져오고 새로고침하면 처음으로 가구나!
  useEffect(() => {
    dispatch(mbtiActions.getQuestionsAPI());
  }, [dispatch]);

  const onClickAnswerA = (type, score) => {
    dispatch(mbtiActions.addScore(type, score));
    setNum(num + 1);
  };
  const onClickAnswerB = (type, score) => {
    dispatch(mbtiActions.addScore(type, score));
    setNum(num + 1);
  };

  if (isLoading) {
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
  }

  if (num > qdata.length - 1) {
    return <BeforeResult />;
  }
  if (qdata.length === 0) {
    return <>No data</>;
  }
  let calc = Math.ceil(((num + 1) / qdata.length) * 100);

  return (
    <MbtiOutter>
      <Grid center column>
        <ProOutter>
          <ProgressBar
            bgColors={"#ff7979"}
            completed={calc}
            current={num + 1}
            maximum={qdata.length}
          />
        </ProOutter>
        <Grid is_flex>
          <Grid center margin="30px">
            <QuestionBox>
              <Text size="36px">Q{num + 1}.</Text>
              <Text size="36px" bold>
                {qdata[num].qa}
              </Text>
            </QuestionBox>
            <AnswerBox>
              <AnswerA onClick={() => onClickAnswerA(qdata[num].mbti, 100)}>
                <Text size="24px" padding="10px 0">
                  {qdata[num].q1}
                </Text>
              </AnswerA>
              <AnswerB onClick={() => onClickAnswerB(qdata[num].mbti, 1)}>
                <Text size="24px" padding="10px 0">
                  {qdata[num].q2}
                </Text>
              </AnswerB>
            </AnswerBox>
          </Grid>
        </Grid>{" "}
      </Grid>
    </MbtiOutter>
  );
};

const MbtiOutter = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 130px;
`;

const ProOutter = styled.div`
  margin: 0px auto;
  width: 400px;
`;

const QuestionBox = styled.div`
  width: 700px;
  height: 200px;
  margin: auto;
  border: 1px solid;
`;
const AnswerBox = styled.div`
  margin-top: 20px;
`;
const AnswerA = styled.div`
  width: 500px;
  margin: auto;
  cursor: pointer;
  border-radius: 15px;
  background-color: #e2e2e2;
  &:hover {
    background-color: #ffe268;
  }
`;
const AnswerB = styled.div`
  width: 500px;
  margin: auto;
  cursor: pointer;
  border-radius: 15px;
  background-color: #e2e2e2;
  &:hover {
    background-color: #ffe268;
  }
`;

export default Mbti;

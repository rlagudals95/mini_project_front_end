import React from "react";
import { Grid, Image, Button, Input } from "../elements";
import axios from "axios";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Mbti = (props) => {
  console.log(props);

  return (
    <React.Fragment>
      <Grid>여긴 mbti</Grid>
      <QuestionBox />
      <OXbox>
        <Obtn
          onClick={() => {
            history.push("/");
          }}
        >
          ⭕
        </Obtn>
        <Xbtn>❌</Xbtn>
      </OXbox>
    </React.Fragment>
  );
};

export default Mbti;

const QuestionBox = styled.div`
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  position: absolute;
  top: 38%;
  background-color: red;
  width: 400px;
  height: 400px;
  border-radius: 50px;
`;

const OXbox = styled.div`
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  position: absolute;
  top: 80%;
  font-size: 200px;
  display: flex;
  justify-content: space-between;
  width: 600px;
  cursor: pointer;
`;

const Obtn = styled.div`
  color: black;
`;

const Xbtn = styled.div`
  color: black;
`;

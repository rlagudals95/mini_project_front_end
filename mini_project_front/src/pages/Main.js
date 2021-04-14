import React from "react";
import { history } from "../redux/configureStore";
import styled, { keyframes } from "styled-components";

const Main = (props) => {


  return (
    <React.Fragment>
      <MainBanner />
      <MbtiBtn
        onClick={() => {
          history.push("/mbti");
        }}
      >
        검사하개
      </MbtiBtn>
    </React.Fragment>
  );
};

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  /* 50% {
    opacity: 0;
  } */
  100% {
    opacity: 0.8;
  }
  `;

const MainBanner = styled.div`
  width: 100%;
  min-width: 250px;
  height: 90vh;
  background-image: url("https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: 20% 80%;
  margin: 0px;
  box-sizing: border-box;
`;

const MbtiBtn = styled.button`
  width: 200px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.9);
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  position: absolute;
  top: 50%;
  color: white;
  border-radius: 80px;
  border: none;
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    /* background-color: white;
    color: black; */
    animation: ${boxFade} 0.3s infinite linear alternate;
  }
`;

export default Main;

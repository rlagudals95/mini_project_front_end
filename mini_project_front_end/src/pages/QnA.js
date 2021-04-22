import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";

const QnA = () => {
  return (
    <Qbox>
      {/* <QnaImg></QnaImg> */}
      <React.Fragment>
        <MeunBtn>
          <a href="http://3.34.48.76/chat/room">챗봇과 상담하기</a>
        </MeunBtn>
      </React.Fragment>
    </Qbox>
  );
};

// const QnaImg = styled.div`
//   opacity: 0.2;
//   background-image: cover;
//   width: 300px;
//   height: 300px;
//   /* background-image: url("https://firebasestorage.googleapis.com/v0/b/image-community-9d16c.appspot.com/o/image%2F%EA%B0%95%EC%95%84%EC%A7%80%20%EC%95%84%EC%9D%B4%EC%BD%98.jpg?alt=media&token=b99e57e7-e092-4edc-b206-da711e953518"); */
// `;

const hoverBox = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0.3;
    
  }
  `;

const Qbox = styled.div`
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MeunBtn = styled.button`
  width: 200px;
  height: 70px;
  top: 250px;
  right: 100px;
  background-color: #ed6b61;
  text-align: center;
  color: white;
  border-radius: 80px;
  border: none;
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  z-index: 20;
  box-shadow: 1px 3px 3px 1px lightgray;
  cursor: pointer;
  a {
    text-decoration: none;
    color: white;
  }
  &:hover {
    animation: ${hoverBox} 1s;
  }
`;

export default QnA;

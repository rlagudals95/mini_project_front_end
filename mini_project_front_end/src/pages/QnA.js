import React from "react";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";

const QnA = () => {
  return (
    <Qbox>
     
      <React.Fragment>
        <MeunBtn>
          <a href="http://3.34.48.76/chat/room">챗봇과 상담하기</a>
        </MeunBtn>
      </React.Fragment>
    </Qbox>
  );
};



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

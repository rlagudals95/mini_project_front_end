import React from "react";
import { Grid, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import styled, { keyframes } from "styled-components";

const MenuBox = () => {
  return (
    <React.Fragment>
      <MenuBoxOuter>
        <Menu
          onClick={() => {
            history.push("/showme");
          }}
        >
          나를보개
          <MenuDesc>주인을 기다리는 친구들을 보러가요</MenuDesc>
          <MeunBtn>참여하기</MeunBtn>
        </Menu>
        <Menu2
          onClick={() => {
            history.push("/boastdog");
          }}
        >
          자랑하개
          <MenuDesc>
            {" "}
            우리 강아지 자랑하기
            <SmallText>로그인 후 이용 가능합니다</SmallText>
          </MenuDesc>
          <MeunBtn>참여하기</MeunBtn>
        </Menu2>
        <Menu3
          onClick={() => {
            history.push("./qna");
          }}
        >
          문의하개
          <MenuDesc>무엇이든 물어보세요</MenuDesc>
          <MeunBtn>참여하기</MeunBtn>
        </Menu3>
      </MenuBoxOuter>
      <Footer>
        <FooterText>
          만든이 Front_end : 김형민, 심현인 | Back_end : 강미진, 김동현, 임다희
          <br />
          후원 302-0794-2497-11 농협
        </FooterText>
      </Footer>
    </React.Fragment>
  );
};

//애니메이션 효과

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

const hoverBox = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0.3;
    
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const MenuBoxOuter = styled.div`
  width: 80vw;
  margin: auto;
  height: 500px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const Menu = styled.div`
  align-items: center;
  padding: 50px;
  width: 300px;
  height: 400px;
  background-color: #fef5f4;
  border-radius: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: 900;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 1px 3px 3px 1px lightgray;
  &:hover {
    /* background-color: white;
    color: black; */
    animation: ${hoverBox} 1s;
  }
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
  font-size: 27px;
  font-weight: bold;
  z-index: 20;
`;

const Menu2 = styled.div`
  padding: 50px;
  width: 300px;
  height: 400px;
  background-color: #fef5f4;
  border-radius: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 1px 3px 3px 1px lightgray;
  &:hover {
    /* background-color: white;
    color: black; */
    animation: ${hoverBox} 1s;
  }
`;

const Menu3 = styled.div`
  padding: 50px;
  width: 300px;
  height: 400px;
  background-color: #fef5f4;
  border-radius: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 1px 3px 3px 1px lightgray;
  &:hover {
    /* background-color: white;
    color: black; */
    animation: ${hoverBox} 1s;
  }
`;

const MenuDesc = styled.div`
  width: 300px;
  height: 130px;
  text-align: center;
  font-size: 20px;
  margin: 30px auto;
`;

const Footer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 200px;
  text-align: center;
  opacity: 0.5;
  padding: auto 0;
`;

const FooterText = styled.div`
  width: 100vw;
  margin-top: 100px;
`;

const SmallText = styled.div`
  font-size: 13px;
  opacity: 0.3;
  top: 130px;
  left: 50%;
  margin: 10px auto 0px auto;
`;

export default MenuBox;

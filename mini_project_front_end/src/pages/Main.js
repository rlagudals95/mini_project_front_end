import React from "react";
import { Grid, Image, Input, Text } from "../elements";

import { history } from "../redux/configureStore";
import styled, { keyframes } from "styled-components";
import MenuBox from "../component/MenuBox";
import "../index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
//폰트를 테마형태로 덮어씌워서 보여줄 수 있음
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { getCookie } from "../shared/Cookie";

const Main = (props) => {
  console.log(props);

  const token = getCookie("token"); // is_login 이라는 키값을 가진 토큰 가져와라
  const is_cookie = token ? true : false; // 그리고 is_cookie로 토큰 유무판단

  const dispatch = useDispatch();


  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
      fontFamily: "Noto Sans KR",
    },
  });

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <MainBanner />
        <MbtiBtn
          onClick={() => {
            history.push("/mbti");
          }}
        >
          검사하개
        </MbtiBtn>

        <MainDescBox>
          <MainDesc>
            반려동물들은 항상 우리를 바라보고 조건없는 따뜻한 사랑을 줍니다.
            <br />
            가족을 기다리는 친구들에게 우리가 먼저 다가가는 건 어떨까요?
          </MainDesc>
        </MainDescBox>
        <MenuBox />
      </React.Fragment>
    </MuiThemeProvider>
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
  height: 85vh;
  background-image: url("https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: 20% 80%;
  margin: 0px;
  box-sizing: border-box;
`;

const MbtiBtn = styled.button`
  width: 150px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.9);
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  position: absolute;
  top: 47%;
  color: white;
  border-radius: 80px;
  border: none;
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    /* background-color: white;
    color: black; */
    animation: ${boxFade} 0.3s infinite linear alternate;
  }
`;

const MainDescBox = styled.div`
  width: 100%;
  height: 130px;
  /* background-color: red; */
  padding: 90px 0px;
`;

const MainDesc = styled.div`
  width: 100%;
  height: 200px;
  /* background-color: blue; */
  text-align: center;
  margin-top: 60px;
  opacity: 0.5;
  font-weight: bold;
`;

const DescLogo = styled.div`
  background-image: url("https://image.freepik.com/free-vector/cute-dog-inside-magnifier-glass-searching-icon-logo-template-vector-illustration_7688-9.jpg");
  background-size: cover;
  width: 300px;
  height: 300px;
  margin: 0px auto;
`;

export default Main;

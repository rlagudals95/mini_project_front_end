import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Mbti from "../pages/Mbti";
import Main from "../pages/Main";
import Header from "../component/Header";
import ShowMe from "../pages/ShowMe";
import BoastDog from "../pages/BoastDog";
import PostWrite from "../pages/PostWrite";
import QnA from "../pages/QnA";
import Css from "./App.css";
import InfinityScroll from "./InifinityScroll";
import InfiTest from "./InfiTest";
import ShowMeDetail from "../pages/ShowMeDetail";
import Login from "../pages/Login";
import { createGlobalStyle } from "styled-components";
import Signup from "../pages/Signup";
import Result from "../pages/Result";
import { getCookie } from "./Cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import ScrollToTop from "./ScrollToTop";

function App() {
  const token = getCookie("is_login"); // is_login 이라는 키값을 가진 토큰 가져와라
  const is_cookie = token ? true : false; // 그리고 is_cookie로 토큰 유무판단

  // React.useEffect(() => {
  //   dispatch(userActions.loginCheckAX(is_cookie, token)); //렌더링 마다 로그인체크
  // });

  if (token && history.location.pathname === "/login") {
    //토큰이 있지만 로그인 페이지다?
    history.push("/");
  } // 로그인이 되어있지만

  return (
    <ReactContainer>
      <GlobalStyle />

      <Header />
      <ConnectedRouter history={history}>
        <ScrollToTop>
          {/* ScrollToTop을 이용해 페이지가 이동할 때마다 스크롤 최상단으로  */}
          <Switch>
            <Route path="/mbti" exact component={Mbti} />
            <Route path="/" exact component={Main} />
            <Route path="/showme" exact component={ShowMe} />
            <Route path="/boastdog" exact component={BoastDog} />
            <Route path="/postwrite" exact component={PostWrite} />
            <Route path="/qna" exact component={QnA} />
            <Route path="/infinity" exact component={InfinityScroll} />
            <Route path="/infitest" exact component={InfiTest} />
            <Route path="/showmedetail" exact component={ShowMeDetail} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/result" exact component={Result} />
            <Route path="/result/:mbti" exact component={Result} />
          </Switch>
        </ScrollToTop>
      </ConnectedRouter>
    </ReactContainer>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
body{
  background-color: #FFF;
  width: 100%;
  overflow-x: hidden;
  margin: 0 0 0 0;
  padding: 0;
  box-sizing: border-box;
}`;

const ReactContainer = styled.div`
  background-color: #fafafa;
  width: 100%;
  overflow-x: hidden;
  padding: 0;
  box-sizing: border-box;
`;

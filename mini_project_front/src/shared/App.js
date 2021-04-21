import React  from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Mbti from "../pages/Mbti";
import Main from "../pages/Main";
import Header from "../component/Header";
import ShowMe from "../pages/ShowMe";
import BoastDog from "../pages/BoastDog";
import PostWrite from "../pages/PostWrite";
import QnA from "../pages/QnA";
import InfinityScroll from "./InifinityScroll";
import InfiTest from "./InfiTest";
import ShowMeDetail from "../pages/ShowMeDetail";
import Login from "../pages/Login";
import { createGlobalStyle } from "styled-components";
import Signup from "../pages/Signup";
import Result from "../pages/Result";

function App() {
  return (
    <ReactContainer>
      <GlobalStyle />
      <Header />
      <ConnectedRouter history={history}>
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

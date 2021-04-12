import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Mbti from "../pages/Mbti";
import Main from "../pages/Main";
import Header from "../component/Header";

function App() {
  return (
    <ReactContainer>
      <Header />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/mbti" exact component={Mbti} />
          <Route path="/" exact component={Main} />
        </Switch>
      </ConnectedRouter>
    </ReactContainer>
  );
}

export default App;

const ReactContainer = styled.div`
  background-color: #fafafa;
  width: 100%;
  overflow-x: hidden;
  margin: 0 0 0 0;
  padding: 0;
  box-sizing: border-box;
`;

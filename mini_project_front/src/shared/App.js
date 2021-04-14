import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Mbti from "../pages/Mbti";
import Main from "../pages/Main";
import Header from "../component/Header";
import {createGlobalStyle} from 'styled-components'
import Result from "../pages/Result";
import tmp from "../pages/tmp";
function App() {
  return (
    <>
    <GlobalStyle/>
      <Header />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/tmp" exact component={tmp} />
          <Route path="/mbti" exact component={Mbti} />
          <Route path="/result" exact component={Result} />
          <Route path="/result/:mbti" exact component={Result} />

        </Switch>
      </ConnectedRouter>
      </>
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

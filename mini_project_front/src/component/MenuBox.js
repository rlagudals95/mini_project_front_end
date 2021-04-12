import React from "react";
import { Grid, Text, Button } from "../elements";
import styled from "styled-components";
import { history } from "../redux/configureStore";

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
        </Menu>
        <Menu
          onClick={() => {
            history.push("/boastdog");
          }}
        >
          자랑하개
        </Menu>
        <Menu>문의하개</Menu>
      </MenuBoxOuter>
    </React.Fragment>
  );
};

const MenuBoxOuter = styled.div`
  width: 80vw;
  margin: auto;
  height: 500px;
  display: flex;
  justify-content: space-between;
  margin-top: 90px;
`;

const Menu = styled.div`
  padding: 10px;
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 20px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 0 10px;
  cursor: pointer;
`;

export default MenuBox;

import React from "react";
import { Grid, Image, Input, Text } from "../elements";
import { history } from "../redux/configureStore";
import ShowMeDogPost from "../component/ShowMePost";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import showme from "../redux/modules/showme";

const ShowMe = (props) => {
  const show_list = useSelector((state) => state.showme.list);

  return (
    <React.Fragment>
      <BoastDogList>
        {/* {show_list.map((s, idx) => {
          return   <ShowMeDogPost key ={s.id}  {...s}/>
        }) } */}
        <ShowMeDogPost />
        <ShowMeDogPost />
        <ShowMeDogPost />
        <ShowMeDogPost />
        <ShowMeDogPost />
        <ShowMeDogPost />
      </BoastDogList>
    </React.Fragment>
  );
};

export default ShowMe;

const BoastDogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-auto-rows: 400px;
  grid-gap: 40px;
  margin: 200px auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 400px;
  width: 980px;
  /* display: flex; */
  height: 100%;
  /* display: block; */

  /* justify-content: space-between; */
  padding: 50px 200px;
  flex-wrap: wrap;
`;

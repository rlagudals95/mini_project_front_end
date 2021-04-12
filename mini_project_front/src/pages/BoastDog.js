import React from "react";
import { Grid, Image, Input, Text } from "../elements";
import { history } from "../redux/configureStore";
import BoastDogPost from "../component/BoastDogPost";
import styled from "styled-components";
import { Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const BoastDog = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    dispatch(postActions.getPostAX());
  }, []);

  return (
    <React.Fragment>
      <BoastDogList>
        {/* {post_list.map(() => {
          return   <BoastDogPost />
        }) } */}
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
      </BoastDogList>
      <Button
        is_float
        text="+"
        _onClick={() => {
          history.push("/postwrite");
        }}
      ></Button>
    </React.Fragment>
  );
};

export default BoastDog;

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
  top: 600px;
  width: 980px;
  /* display: flex; */
  height: 100%;
  /* display: block; */

  /* justify-content: space-between; */
  padding: 50px 200px;
  flex-wrap: wrap;
`;

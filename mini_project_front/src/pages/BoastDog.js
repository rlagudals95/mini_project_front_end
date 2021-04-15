import React from "react";
import { Grid, Image, Input, Text } from "../elements";
import { history } from "../redux/configureStore";
import BoastDogPost from "../component/BoastDogPost";
import { Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import BoastDogModal from "./BoastDogModal";
import styled, { keyframes } from "styled-components";

const BoastDog = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  React.useEffect(() => {
    dispatch(postActions.getPostAX());
  }, []);

  const { history } = props;

  console.log(post_list);

  return (
    <React.Fragment>
      <BoastDogList>
        {post_list.map((p, idx) => {
          return <BoastDogPost key={p.id} {...p} />;
        })}
        {/* <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost />
        <BoastDogPost /> */}
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

// const BoastDogListOut = styled.div`
//   width

// `

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

const BoastDogTitle = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
  text-align: center;
`;

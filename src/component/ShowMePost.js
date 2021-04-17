import React from "react";
import { Grid, Text, Button } from "../elements";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useState } from "react";
import ShowmeModal from "../pages/ShowmeModal";

const ShowMeDogPost = (props) => {
  // console.log(props.image);
  const [is_modal, setDetailModal] = useState();
  const [is_changemodal, setChangeModal] = useState();

  const openDetailModal = () => {
    setDetailModal(true);
  };

  const closeDetailModal = () => {
    setDetailModal(false);
  };

  const openChangeModal = () => {
    setChangeModal(true);
  };

  const closeChangeModal = () => {
    setChangeModal(false);
  };

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

  const PostBox = styled.div`
    width: 300px;
    height: 300px;
    background-image: url("${props.image}");
    //background-image: url("-moz-context-properties.img_url")
    background-size: cover;
    display: flex;
    justify-content: space-between;
    box-shadow: 1px 3px 3px 1px lightgray;
    &:hover {
      /* background-color: white;
    color: black; */
      animation: ${hoverBox} 1s;
    }
    cursor: pointer;
  `;

  return (
    <React.Fragment>
      <PostBox onClick={openDetailModal}></PostBox>
      {is_modal ? <ShowmeModal close={closeDetailModal} {...props} /> : null}
    </React.Fragment>
  );
};

export default ShowMeDogPost;

// const LikeBox = styled.div`
//   width: 100px;
//   height: 30px;
//   /* background-color: rgba(0, 0, 0, 0.5); */
//   font-size: 20px;
//   font-weight: bold;
//   color: white;
//   align-items: center;
//   margin-top: 10px;
//   margin-left: -13px;
// `;

import React from "react";
import { Grid, Text, Button } from "../elements";
import styled, { keyframes } from "styled-components";
import { history } from "../redux/configureStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useState } from "react";
import ShowmeModal from "../pages/ShowmeModal";

const ShowMeDogPost = (props) => {
  console.log(props.post_image_url);
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

  return (
    <React.Fragment>
      <PostBox onClick={openDetailModal}></PostBox>
      {is_modal ? <ShowmeModal close={closeDetailModal} {...props} /> : null}
    </React.Fragment>
  );
};

export default ShowMeDogPost;

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
  height: 400px;
  background-image: url("https://www.thesprucepets.com/thmb/COdGzNriu8oQVi8igXmSzFzXTRk=/2109x2109/smart/filters:no_upscale()/puppy-samoyed-boy-990077480-5c89719646e0fb00012c67e8.jpg");
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

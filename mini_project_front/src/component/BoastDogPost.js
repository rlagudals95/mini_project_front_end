import React, { useState } from "react";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";

import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import SendIcon from "@material-ui/icons/Send";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import BoastDogModal from "../pages/BoastDogModal";
import styled, { keyframes } from "styled-components";

const BoastDogPost = (props) => {
  const dispatch = useDispatch();

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

  //스타일 컴포넌트//
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
    background-size: cover;
    background-image: url("${props.post_image_url}");
    background-position: -150px 0px;
    &:hover {
      /* background-color: white;
    color: black; */
      animation: ${hoverBox} 1s;
    }
    cursor: pointer;
  `;

  //스타일 컴포넌트//

  return (
    <React.Fragment>
      <PostBox src={props.post_image_url} onClick={openDetailModal}>
        <LikeBox>
          <FavoriteBorderIcon
          // onClick={ }
          />
          0
        </LikeBox>
      </PostBox>
      {is_modal ? <BoastDogModal close={closeDetailModal} {...props} /> : null}
    </React.Fragment>
  );
};

BoastDogPost.defaultProps = {
  // id:null
};

const LikeBox = styled.div`
  width: 100px;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  align-items: center;
  margin-top: 10px;
  margin-left: -13px;
`;

export default BoastDogPost;

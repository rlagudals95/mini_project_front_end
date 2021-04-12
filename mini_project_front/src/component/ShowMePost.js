import React from "react";
import { Grid, Text, Button } from "../elements";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const ShowMeDogPost = () => {
  return (
    <React.Fragment>
      <PostBox></PostBox>
    </React.Fragment>
  );
};

export default ShowMeDogPost;

const PostBox = styled.div`
  width: 300px;
  height: 400px;
  background-image: url("https://www.thesprucepets.com/thmb/COdGzNriu8oQVi8igXmSzFzXTRk=/2109x2109/smart/filters:no_upscale()/puppy-samoyed-boy-990077480-5c89719646e0fb00012c67e8.jpg");
  //background-image: url("-moz-context-properties.img_url")
  background-size: cover;
  display: flex;
  justify-content: space-between;
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

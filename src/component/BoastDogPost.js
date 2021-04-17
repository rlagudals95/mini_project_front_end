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
import { actionCreators as postActions } from "../redux/modules/post";

const BoastDogPost = (props) => {
  const dispatch = useDispatch();

  console.log(props);
  const [is_modal, setDetailModal] = useState();
  const [is_changemodal, setChangeModal] = useState();

  const testLike = () => {
    //이렇게 써야 무한 렌더링 안된다!!
    dispatch(postActions.editLikeAX(props, props.id));
  };

  const a = () => {
    window.alert("좋아요 눌러짐!");
  };
  // const comment_list = useSelector((state) => state.comment.list[props.id]);

  // const is_me = useSelector((state) => state.user.user.user_id); // 로그인한 사용자.
  // const user_info = useSelector((state) => state.user.user);
  // const idx = props.like_id.findIndex((l) => l === user_info.user_id);
  //const is_like = idx !== -1 ? true : false;

  // const likeSubmit = () => {
  //   if (!is_login) {
  //     window.alert("😀로그인 해야 할 수 있어요!");
  //     return;
  //   }
  //   let like_id;
  //   if (props.like_id.length === 0) {
  //     like_id = [user_info.user_id];
  //   } else {
  //     like_id = [...props.like_id, user_info.user_id];
  //   }
  //   let cnt = props.like_cnt + 1;

  //   let post = {
  //     userId: props.user_id,
  //     userName: props.user_name,
  //     contents: props.content,
  //     img: props.post_image_url,
  //     myImg: props.profile_image_url,
  //     insertDt: props.insert_dt,
  //     likeCnt: cnt,
  //     likeId: like_id,
  //   };
  //   let post_id = props.id;
  //   // console.log(post);
  //   dispatch(postActions.editLikeAX(post, post_id));
  // };

  // const dislikeSubmit = () => {
  //   let like_id = [];
  //   like_id = props.like_id.filter((l, idx) => {
  //     if (l !== user_info.user_id) {
  //       // console.log(like_id);
  //       return [...like_id, l];
  //     }
  //   });
  //   let cnt = props.like_cnt - 1;
  //   let post = {
  //     userId: props.user_id,
  //     userName: props.user_name,
  //     contents: props.content,
  //     img: props.post_image_url,
  //     myImg: props.profile_image_url,
  //     insertDt: props.insert_dt,
  //     likeCnt: cnt,
  //     likeId: like_id,
  //   };
  //   let post_id = props.id;
  //   dispatch(postActions.editLikeAX(post, post_id));
  // };

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
    height: 300px;
    background-size: cover;
    background-image: url("${props.post_image_url}");
    background-repeat: no-repeat;
    /* background-position: -130px 0px; */
    box-shadow: 1px 3px 3px 1px lightgray;
    //이미지 수정요망
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
        <LikeBox onClick={a}>
          {/* {is_like ? (
            <FavoriteIcon
              padding-right="16px"
              cursor="pointer"
              color="secondary"
              onClick={dislikeSubmit}
            />
          ) : (
            <FavoriteBorderIcon
              padding-right="16px"
              cursor="pointer"
              onClick={likeSubmit}
            />
          )} */}
          {/* 라이크 id의 length로 해주자 카운트는 */}
          <FavoriteBorderIcon onClick={testLike} />0
        </LikeBox>
      </PostBox>
      {is_modal ? <BoastDogModal close={closeDetailModal} {...props} /> : null}
    </React.Fragment> //여기서 댓글 정보랑 모든걸 넘겨주려나?
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
  z-index: 3000;
  background-color: #ffa96d;
`;

export default BoastDogPost;

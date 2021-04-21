import React, { useState } from "react";
import { Grid, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModalForChange from "./ModalForChange";

import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import SendIcon from "@material-ui/icons/Send";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import BoastDogModal from "../pages/BoastDogModal";
import styled, { keyframes } from "styled-components";
import { actionCreators as postActions } from "../redux/modules/post";
import { getCookie } from "../shared/Cookie";

//로그인 후에 이용가능 합니다
const BoastDogPost = (props) => {
  const dispatch = useDispatch();
  // console.log(props);
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
  const user_info = useSelector((state) => state.user.user);
  const idx = props.like_id.findIndex((l) => l === user_info.username);
  const is_like = idx !== -1 ? true : false; // 현재 게시물의 like_id에 접속 user_name 없을경우
  const token = getCookie("token");
  const is_login = useSelector((state) => state.user.is_login);

  console.log("이포스트의 정보", props);
  // console.log(user_info.username);
  const likeSubmit = () => {
    if (!is_login) {
      window.alert("😀로그인 해야 할 수 있어요!");
      return;
    }
    let like_id;
    if (props.like_id.length === 0) {
      like_id = [user_info.username]; //user_id?
    } else {
      like_id = [...props.like_id, user_info.username]; // username으로 바꿔야 하지 싶다
    }

    // props뒤의 값들은 내가 받아온값 서버에서 get해온 값을  postlist에서 props로 넘겨준거 알죠?
    let post = {
      content: props.content,
      nickname: props.user_name, //포스트를 작성한 username
      imgUrl: props.post_image_url,
      likeCnt: like_id.length,
      likeId: like_id, // 좋아요를 누른 username들
    };
    let post_id = props.id;
    // console.log(post);
    dispatch(postActions.editLikeAX(post, post_id, token));
  };

  const dislikeSubmit = () => {
    let like_id = [];
    like_id = props.like_id.filter((l, idx) => {
      if (l !== user_info.username) {
        return [...like_id, l];
      }
    });
    // console.log(like_id);

    let post = {
      username: props.user_name,
      content: props.content,
      imgUrl: props.post_image_url,

      likeCnt: like_id.length,
      likeId: like_id,
    };
    let post_id = props.id;
    dispatch(postActions.editLikeAX(post, post_id, token)); //서버에서 수정을 안해주나..?
  };

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
      <Card>
        <LikeBox>
          {is_like ? (
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
          )}
          <CntBox>{props.like_id.length}</CntBox>
        </LikeBox>
        <PostBox src={props.post_image_url} onClick={openDetailModal}>
          {/* {is_changemodal ? (
            <ModalForChange close={closeChangeModal} {...props} />
          ) : null} */}
        </PostBox>
        {is_modal ? (
          <BoastDogModal close={closeDetailModal} {...props} />
        ) : null}
      </Card>
    </React.Fragment> //여기서 댓글 정보랑 모든걸 넘겨주려나?
  );
};

BoastDogPost.defaultProps = {
  // id:null
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

const Card = styled.div`
  width: 100%;
  height: 100%;
`;

const LikeBox = styled.div`
  width: 80px;
  height: 27px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  align-items: center;
  margin-top: 10px;
  margin-left: -13px;
  z-index: 3000;
  background-color: #ffa96d;
  border-radius: 2px;
  animation: ${hoverBox} 1s;
`;
const CntBox = styled.span`
  margin: 8px 0px 8px 2px;
`;

export default BoastDogPost;

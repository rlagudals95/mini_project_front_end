import React, { useState } from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { actionCreators as commentActions } from "../redux/modules/comment";

import ModalForChange from "../component/ModalForChange";

import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../shared/Cookie";

const ModalDetail = (props) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState();
  const token = getCookie("token");

  React.useEffect(() => {
    dispatch(commentActions.getCommentAX(props.id)); // 포스트 번호 보내줌
  }, []);

  const user_info = useSelector((state) => state.user.user);
  const comment_list = useSelector((state) => state.comment.list);
  const is_comment = comment_list ? true : false; // 댓글이 없다면 보여줄 필요가 없지 않은가?
  const is_login = useSelector((state) => state.user.is_login);

  console.log("닉네임", user_info.nickname); //username이 전부 hmk로 들어간다..

  const ok_submit = comments ? true : false;

  const selectComment = (e) => {
    console.log(e.target.value);
    setComments(e.target.value);
  };

  const addComment = () => {
    if (!is_login) {
      window.alert("😀로그인 해야 할 수 있어요!");
      return;
    }

    console.log("이 포스트의 props는?", props);
    let comment_info = {
      comment: comments,
      nickname: user_info.nickname,
    };
    dispatch(commentActions.addCommentAX(comment_info, props.id, token));
    //  props.id는 포스트 id 같다
    setComments("");
  };

  const deleteComment = (id) => {
    // 댓글 id
    // id : 포스트id ,
    console.log("댓글 id", id);
    console.log("포스트 id", props.id);
    dispatch(commentActions.deleteCommentAX(id, props.id, token));
  };

  // 시간 설정

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  const [is_changemodal, setChangeModal] = useState();

  const openChangeModal = () => {
    setChangeModal(true);
  };

  const closeChangeModal = () => {
    setChangeModal(false);
  };

  return (
    <React.Fragment>
      <ModalComponent>
        {/* 수정모달 */}
        {is_changemodal ? (
          <ModalForChange close={closeChangeModal} {...props} />
        ) : null}

        <ModalImg src={props.post_image_url} />
        <ModalRightContainer>
          <ModalHeader>
            <ModalLeftHeader>
              {/* <ProCircle /> */}
              <ModalAuthor>{props.nickname}</ModalAuthor>
              <PostTime> {timeForToday(props.insert_dt)}</PostTime>
              <ExitContainer>
                {props.nickname === user_info.nickname ? (
                  <MoreHorizIcon
                    onClick={() => {
                      setChangeModal(openChangeModal);
                    }}
                  />
                ) : null}

                <ExitBtn>
                  <CloseIcon onClick={props.close} />
                </ExitBtn>
              </ExitContainer>
            </ModalLeftHeader>

            {/* {props.user_id === props.is_me ? (
              <ModalRightHeader onClick={props.openChangeModal}>
                <MoreHorizIcon height="14px" width="14px" cursor="pointer" />
              </ModalRightHeader>
            ) : null} */}
          </ModalHeader>
          <ContentsBox>{props.content}</ContentsBox>
          <ModalCmtBox>
            {is_comment //props로 받은 코멘트가 있어? 있다면 map으로 보여줘
              ? comment_list.map((c, idx) => {
                  return (
                    <ModalCmt>
                      <ModalCmtRight>
                        <div>
                          <ModalAuthor>{c.username}</ModalAuthor>
                          {c.comment}
                        </div>
                        {c.username === user_info.nickname ? ( //여기서
                          <CmtDeleteBtn
                            onClick={() => {
                              deleteComment(c.comment_id);
                            }}
                          >
                            <DeleteForeverIcon />
                          </CmtDeleteBtn>
                        ) : null}
                      </ModalCmtRight>
                    </ModalCmt>
                  );
                })
              : null}
          </ModalCmtBox>
          <ModalCmtInputBox>
            <ModalCmtInput
              type="text"
              placeholder="댓글달기..."
              onChange={selectComment}
              value={comments}
            />

            {ok_submit ? (
              <ModalUpload onClick={addComment}>게시</ModalUpload>
            ) : (
              <ModalUpload style={{ opacity: "0.3" }}>게시</ModalUpload>
            )}
          </ModalCmtInputBox>
        </ModalRightContainer>
      </ModalComponent>
      <Component onClick={props.close} />
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          {/* <CloseIcon fontSize="large" /> */}
        </ExitBtn>
      </ExitContainer>
    </React.Fragment>
  );
};

const Component = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.4;
  width: 10000px;
  height: 10000px;
  background-color: black;
  z-index: 1000;
`;
const ModalComponent = styled.div`
  position: relative;
  width: 950px;
  height: 600px;
  margin: 0px auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 2000;
  display: flex;
  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;
const ExitContainer = styled.div`
  z-index: 2000;
  position: fixed;
  top: 0;
  right: 0;
  padding: 8px;
`;
const ExitBtn = styled.button`
  cursor: pointer;
  color: gray;
  background-color: transparent;
  font-size: 14px;
  border: none;
`;
const ModalImg = styled.img`
  width: 600px;
  height: 600px;
  background-size: cover;
  @media (max-width: 950px) {
    display: none;
  }
`;
const ModalRightContainer = styled.div`
  width: 350px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #efefef;
`;
const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalRightHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

// const ProCircle = styled.img`
//   height: 32px;
//   width: 32px;
//   border-radius: 50%;
//   background-size: cover;
//   margin-right: 10px;
// `;
const ModalAuthor = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
`;

const ModalCmtInputBox = styled.div`
  width: 100%;
  height: 56px;
  padding: 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-top: 1px solid #efefef;
`;
const ModalCmtInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 80%;
`;
const ModalUpload = styled.div`
  font-size: 14px;
  color: #3897f0;
  cursor: pointer;
  font-weight: 600;
`;
const ModalCmtBox = styled.div`
  padding: 0px 16px;
  margin-right: 0px;
  display: flex;
  flex-direction: column;
  height: 480px;
  /* 아래 태그는 댓글이 많으면 
  스크롤로 아래 부분이 위로 올라가게 해서 
  댓글이 보여지게 함 */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ModalCmt = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ModalCmtRight = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;
const CmtDeleteBtn = styled.button`
  height: 12px;
  width: 12px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  margin-right: 15px;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
`;

const PostTime = styled.div`
  font-size: 10px;
  color: #999;
  padding: 4px;
  margin-left: 40px;
`;

const ContentsBox = styled.div`
  color: #999;
  font-size: 13px;
  font-weight: bolder;
  /* border-bottom: 1px solid #efefef; */
  width: 328px;
  padding: 10px;
  padding: 16px;
  border-bottom: 1px solid #efefef;
`;

export default ModalDetail;

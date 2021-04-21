import React, { useState } from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch } from "react-redux";

const ModalDetail = (props) => {
  const dispatch = useDispatch();

  //   const ok_submit = comments ? true : false;
  console.log(props);

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

  return (
    <React.Fragment>
      <Component onClick={props.close} />
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          <CloseIcon fontSize="large" />
        </ExitBtn>
      </ExitContainer>
      <ModalComponent>
        <ModalImg />
        <ModalRightContainer>
          <ModalHeader>
            <ModalLeftHeader>
              <ModalAuthor>강아지 이름</ModalAuthor>
            </ModalLeftHeader>
          </ModalHeader>
          {/* <ContentsBox>오늘은 여기까지!</ContentsBox> */}
          <ModalCmtBox>강아지 설명</ModalCmtBox>
        </ModalRightContainer>
      </ModalComponent>
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 10;
`;
const ModalComponent = styled.div`
  position: fixed;
  width: 950px;
  height: 600px;
  top: 50%;
  left: 50%;
  /* transform: translate(-50%, -50%); */
  background-color: white;
  z-index: 20;
  display: flex;
  @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  }
`;
const ExitContainer = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;
`;
const ExitBtn = styled.button`
  cursor: pointer;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;
const ModalImg = styled.img`
  width: 600px;
  height: 600px;
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
  border-bottom: 1px solid #efefef;
  width: 100%;
  padding: 10px;
`;

export default ModalDetail;

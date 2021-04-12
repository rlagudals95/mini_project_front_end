import React from "react";
import { Grid, Text, Button } from "../elements";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";
import InstagramIcon from "@material-ui/icons/Instagram";

import { Route } from "react-router-dom";

import { history } from "../redux/configureStore";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  return (
    <React.Fragment>
      <HeaderBox>
        <InnerBox>
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
            <InstaLogo />
          </Logo>
          <BtnBox>
            <Btn>
              <MeetingRoomIcon
              //   onClick={() => {
              //     dispatch(userActions.logOutSV(history));
              //     history.replace("/login");
              //   }}
              />
            </Btn>
            <Btn>
              <HomeIcon
              //   onClick={() => {
              //     history.push("/");
              //   }}
              />
            </Btn>
            <Btn>
              <FavoriteBorderIcon />
            </Btn>
            <ProfileImg
            // {...styles}
            // onClick={() => {
            //   history.push("/profile"); //profile로 가기로 하자
            //   dispatch(profileActions.getProfileDB(token));
            // }}
            />
          </BtnBox>
        </InnerBox>
      </HeaderBox>
    </React.Fragment>
  );
};

// const HeaderOutter = styled.div`
//   width: 100%;
//   min-width: 400px;
//   height: 75px;
//   display: flex;
//   justify-content: space-between;
// `;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  align-items: center;
  border: 1px solid lightgray;
  padding: 10px 10px 10px 10px;
  background-color: white;
  height: 60px;
  z-index: 5;
  margin: 0px;
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  /* margin-left: 530px; */
  margin: 0px auto;
  padding: 0 40px;
`;

const BtnBox = styled.div`
  width: 150px;
  display: flex;
`;

const Logo = styled.div`
  display: flex;
  font-weight: bold;
  cursor: pointer;
`;

const Btn = styled.div`
  cursor: pointer;
  margin: 0px 7px;
`;

const InstaLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/image-community-9d16c.appspot.com/o/images%2F%EB%B0%9C%EA%B2%AC-%EB%A1%9C%EA%B3%A0.jpg?alt=media&token=45ca9be6-842f-47d1-95cc-ea6b47c02046");
  background-size: cover;
  height: 50px;
  width: 120px;
  margin-left: -30px;
`;

const ProfileImg = styled.div`
  width: 25px;
  height: 25px;
  background-image: url("${(props) => props.src}");
  /* background-image: url("https://img.freepik.com/free-photo/white-cloud-blue-sky-sea_74190-4488.jpg?size=626&ext=jpg&ga=GA1.2.838545545.1616457600"); */
  border-radius: 15px;
  margin: 0px 7px;
  cursor: pointer;
`;

export default Header;

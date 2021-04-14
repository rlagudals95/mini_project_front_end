import React from "react";
import styled from "styled-components";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";
import { history } from "../redux/configureStore";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const Header = () => {
  return (
    <>
      <HeaderBox>
        <InnerBox>
          <Logo
            onClick={() => {
              history.replace("/");
              window.location.reload()

            }}
          >
            <ProjectLogo />
          </Logo>
          <BtnBox>
            <Btn>
              <MeetingRoomIcon/>
            </Btn>
            <Btn>
              <HomeIcon/>
            </Btn>
            <Btn>
              <FavoriteBorderIcon />
            </Btn>
          </BtnBox>
        </InnerBox>
      </HeaderBox>
    </>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border: 1px solid lightgray;
  padding: 10px 10px 10px 10px;
  background-color: white;
  height: 60px;
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

const ProjectLogo = styled.div`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/image-community-9d16c.appspot.com/o/images%2F%EB%B0%9C%EA%B2%AC-%EB%A1%9C%EA%B3%A0.jpg?alt=media&token=45ca9be6-842f-47d1-95cc-ea6b47c02046");
  background-size: cover;
  height: 50px;
  width: 120px;
  margin-left: -30px;
`;

export default Header;

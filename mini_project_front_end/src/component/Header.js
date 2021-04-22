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
import { actionCreators as userActions } from "../redux/modules/user";
import Permit from "../shared/Permit";

const Header = () => {
  const is_login = useSelector((state) => state.user.is_login);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(userActions.logOutAX());
  };
  return (
    <React.Fragment>
      <HeaderBox>
        <InnerBox>
          <Logo
            onClick={() => {
              window.location.replace('/')
            }}
          >
            <InstaLogo />
          </Logo>
          <InfoBox>
            {is_login ? `${user.nickname}님 환영합니다!` : null}
          </InfoBox>
          <BtnBox>
            <Btn>
              <LogBox>
                {!is_login ? (
                  <Login
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    로그인
                  </Login>
                ) : (
                  <LogOut onClick={logOut}>로그아웃</LogOut>
                )}
              </LogBox>
            </Btn>
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

const LogBox = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  padding-top: 45px;
`;

const InfoBox = styled.div`
  width: 300px;
  height: 75px;
  display: flex;
  justify-content: space-between;
  padding-top: 45px;
  font-weight: 200;
  opacity: 0.6;
`;

const Login = styled.div`
  width: 70px;
  height: 50px;
`;

const LogOut = styled.div`
  width: 70px;
  height: 50px;
`;

const DecoBox = styled.div`
  width: 350px;
  height: 80px;
  background-color: red;
`;

export default Header;

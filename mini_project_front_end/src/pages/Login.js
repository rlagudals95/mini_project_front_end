import React from "react";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useSelector } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    if (email === "" || password === "") {
      window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
      return;
    }

    dispatch(userActions.LoginAX(email, password));
  };

  return (
    <Bg>
      <OutBox>
        <InnerBox>
          <LoginBox>
            {/* <div style={{ fontSize: "50px", margin: "20px 0px 10px 0px " }}>
              LOGO
            </div> */}
            <Logo></Logo>
            <Grid padding="16px 0px" width="240px" margin="0px auto">
              <Input
                width="240px"
                placeholder="이메일을 입력해주세요"
                _onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                width="240px"
                margin="10px auto"
                placeholder="패스워드 입력해주세요."
                type="password"
                _onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                text="로그인"
                width="240px"
                height="40px"
                _onClick={login}
              />
            </Grid>
          </LoginBox>
          <SingUpBox>
            <SingUpText>
              계정이 없으신가요?{" "}
              <span
                style={{ color: "#0095f6", fontWeight: "bold" }}
                onClick={() => {
                  history.push("/signup");
                }}
              >
                가입하기
              </span>
            </SingUpText>
          </SingUpBox>
        </InnerBox>
      </OutBox>
    </Bg>
  );
};

const OutBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 700px;
  height: 600px;
  top: 13%;
  margin: 25% auto;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;

const InnerBox = styled.div`
  width: 330px;
  height: 400px;
  margin: auto;
`;


const Logo = styled.div`
  margin: 20px auto;
  width: 195px;
  height: 80px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/image-community-9d16c.appspot.com/o/images%2F%EB%B0%9C%EA%B2%AC-%EB%A1%9C%EA%B3%A0.jpg?alt=media&token=45ca9be6-842f-47d1-95cc-ea6b47c02046");
  background-size: cover;
`;

const LoginBox = styled.div`
  width: 300px;
  align-items: center;
  margin: auto;
  border: 1px solid lightgray;
`;

const LoginBtn = styled.button`
  width: 240px;
  height: 25px;
`;

const SingUpBox = styled.div`
  border: 1px solid lightgray;
  width: 300px;
  height: 80px;
  margin: 10px auto;
  text-align: center;
`;

const SingUpText = styled.div`
  margin-top: 27px;
  align-items: center;
  cursor: pointer;
`;

const Bg = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
`;

export default Login;

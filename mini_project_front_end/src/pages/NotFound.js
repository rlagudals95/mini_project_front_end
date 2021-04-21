// 정의된 api url이 아닌 경우 보이게 하는 NotFound 페이지
import React from "react";
import styled from "styled-components";

const NotFound = (props) => {
  return (
    <React.Fragment>
      <NonExist />
    </React.Fragment>
  );
};

export default NotFound;

const Outter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const NonExist = styled.img`
  background-image: url("https://firebasestorage.googleapis.com/v0/b/image-community-9d16c.appspot.com/o/image%2F%EA%B0%95%EC%95%84%EC%A7%80%20%EC%95%84%EC%9D%B4%EC%BD%98.jpg?alt=media&token=b99e57e7-e092-4edc-b206-da711e953518");
  border: none;
  outline: none;
  position: fixed;
  width: 450px;
  height: 400px;
  font-size: 50px;
  border-radius: 10px;
  background-color: transparent;
  /* 이미지를 가운데로 정렬시키는 부분 */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  z-index: 10;

  /* 화면이 614px 이하가 되면 이미지가 절반으로 축소되는 반응형 */
  @media (max-width: 614px) {
    width: 50%;
    height: auto;
  }
`;

// const InstaImage = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
// `;

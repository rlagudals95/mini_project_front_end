import React from "react";
import styled from "styled-components";
const QnA = () => {
  return (
    <Qbox>
      <React.Fragment>여기는 QnA</React.Fragment>
    </Qbox>
  );
};

const Qbox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default QnA;

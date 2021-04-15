import React from "react";
import { history } from "../redux/configureStore";
import { Text, Grid, Button, Image } from "../elements";
import beforeImg from "../shared/before.png";
import styled from "styled-components";

const BeforeResult = () => {
  const goToResult = () => {
    history.push("/result");
  };
  return (
    <Grid center column padding="100px 0 0 0">
      <Grid width="auto" margin="10px 0 0 0">
        <Grid margin={"0px auto"}>
          <Image src={beforeImg} shape="circle" size="300" />
        </Grid>
        <Text size="24">과연 나에게 맞는 견종은..??</Text>
      </Grid>
      <Button width="200px" _onClick={goToResult}>
        결과 보러 가기!
      </Button>
    </Grid>
  );
};

export default BeforeResult;

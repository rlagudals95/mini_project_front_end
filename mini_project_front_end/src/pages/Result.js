import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mbtiActions } from "../redux/modules/mbti";
import { Text, Grid } from "../elements";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Result = (props) => {
  const dispatch = useDispatch();
  const type_data = useSelector((state) => state.mbti.type_data);
  const isLoading = useSelector((state) => state.mbti.isLoading);
  const result = useSelector((state) => state.mbti.result);
  useEffect(() => {
    if (result[0].score.length === 0) {
      window.alert("검사해주세요!");
      window.location.href = "/";
    }
    dispatch(mbtiActions.totalResult(result));
  }, [dispatch, result]);
  const onClickAdopt = (dog) => {
    history.push(`/showme/${dog}`);
  };
  const removeBlank = (word) => {
    if (word.split(" ").length >= 2) {
      return word.split(" ").join("");
    } else {
      return word;
    }
  };

  if (isLoading) {
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
  }

  return (
    <Grid center column>
      <Grid width="auto" margin="10px 0 0 0">
        <Text size="20px" color="rgba(0, 0, 0, 0.3)">
          당신에게 어울리는 견종은..?
        </Text>
        <Text size="30px" bold>
          {type_data.content}
        </Text>
        <Text size="25px" bold color="#fea966">
          {" "}
          {type_data.type}
        </Text>
        <img
          src={type_data.img}
          alt="dog"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "600px",
            maxHeight: "600px",
          }}
        />
        <Text size="24px" bold>
          {" "}
          {type_data.dog}
        </Text>
        <AdoptButton onClick={() => onClickAdopt(removeBlank(type_data.dog))}>
          {type_data.dog}가(이) 있는 보호소로 이동
        </AdoptButton>
      </Grid>
    </Grid>
  );
};

const AdoptButton = styled.div`
  width: 500px;
  margin: 0 auto 100px auto;
  cursor: pointer;
  border-radius: 15px;
  background-color: #e2e2e2;
  &:hover {
    background-color: #ffe268;
  }
`;

export default Result;

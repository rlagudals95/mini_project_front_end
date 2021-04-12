import React, { useState } from "react";
import Upload from "../component/Upload";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";

const PostWrite = (props) => {
  const [contents, setContents] = React.useState("");
  const post_list = useSelector((state) => state.post.list);

  console.log(post_list);
  React.useEffect(() => {
    console.log("포스트 정보가 없습니다!");

    return;
  });

  return (
    <React.Fragment>
      <WriteMainContainer>
        <WriteInner>
          <WriteBox>
            <WriteHeader>
              <WriteHeaderLeft>
                <WriteProfile src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCk2-LJjRBpWc52H7I65XKiznrM1R_l3E81w&usqp=CAU" />
                <PostAuthor>user_name</PostAuthor>
              </WriteHeaderLeft>
            </WriteHeader>
            <WriteContent>
              <WriteUpload>
                <Upload />
              </WriteUpload>
              <WriteImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCk2-LJjRBpWc52H7I65XKiznrM1R_l3E81w&usqp=CAU" />
              <TextField
                id="outlined-multiline-static"
                label="📝우리 강아지는..."
                multiline
                rows={6}
                variant="outlined"
                // value={contents}
              />

              <WriteSubmit>게시글 작성</WriteSubmit>
            </WriteContent>
          </WriteBox>
        </WriteInner>
      </WriteMainContainer>
    </React.Fragment>
  );
};

PostWrite.defaultProps = {
  user_name: "hmk1022",
  image_url:
    "https://images.theconversation.com/files/348622/original/file-20200721-15-dswf3q.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
};

const WriteMainContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 55%;
  transform: translate(-50%, -50%);

  top: 50%;
`;

const WriteInner = styled.div`
  width: 935px;
`;

const WriteBox = styled.div`
  width: 614px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-sizing: border-box;
  margin-bottom: 60px;
  background: white;
  padding-bottom: 20px;
  @media (max-width: 614px) {
    width: 100vw;
  }
`;

const WriteHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
`;
const WriteHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const PostAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const WriteProfile = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 14px;
  border-radius: 50%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const WriteContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const WriteUpload = styled.div`
  width: 100%;
  padding: 10px 20px;
`;

const WriteImg = styled.img`
  width: 100%;
  height: auto;
  margin: 10px 0;
  box-sizing: border-box;
`;
const WriteSubmit = styled.button`
  margin: auto;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  background-color: #0095f6;
  color: white;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  border: none;
`;

export default PostWrite;

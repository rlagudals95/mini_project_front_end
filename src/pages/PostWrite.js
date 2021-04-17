import React, { useState } from "react";
import Upload from "../component/Upload";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = (props) => {
  const dispatch = useDispatch();

  const preview = useSelector((state) => state.image.preview);
  // const preview = useSelector((state) => state.image.preview);
  // const user_info = useSelector((state) => state.user.user);

  const [contents, setContents] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [value, setValue] = React.useState("");

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const post_list = useSelector((state) => state.post.list);
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const _post = is_edit ? post_list.find((p) => p.id == post_id) : null; //이건 무슨 뜻일까?
  const ok_submit = contents ? true : false;

  //id 여부에 따른 id_edit 이거 app.js에서 좀 더 공부해보자
  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.post_image_url)); // 페이지가 렌더링 되면서 기존 이미지 같이 렌더링
    } else {
      dispatch(imageActions.setPreview("http://via.placeholder.com/400x300"));
    }
  }, []);

  const addPost = () => {
    if (!contents) {
      window.alert("빈칸을 채워주세요 :)");
      return;
    }

    dispatch(postActions.addPostAX(contents));
  };

  // 이미 사이즈 변동을 막기위해 스타일 컴포넌트 하나만 위로 올려줌
  const WriteImg = styled.img`
    width: 100%;
    height: 500px;
    margin: 10px 0;
    box-sizing: border-box;
    background-size: cover;
    background-image: url(${preview});
  `;

  // const addPost = () => {
  //   // const token = 쿠키 만들어야함
  //   if (token) {
  //     console.log("작성 가능");
  //   } else if (!token) {
  //     window.alert("로그인 후 이용 가능합니다");
  //   } else if (!contents) {
  //     window.alert("빈 칸을 채워주세요!")
  //   }

  // }

  return (
    <React.Fragment>
      <WriteMainContainer>
        <WriteInner>
          <WriteBox>
            <WriteHeader>
              <WriteHeaderLeft>
                {/* <WriteProfile src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCk2-LJjRBpWc52H7I65XKiznrM1R_l3E81w&usqp=CAU" /> */}
                <PostAuthor>{props.user_name}</PostAuthor>
              </WriteHeaderLeft>
            </WriteHeader>
            <WriteContent>
              <WriteUpload>
                <Upload />
              </WriteUpload>
              {/* <WriteImg src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCk2-LJjRBpWc52H7I65XKiznrM1R_l3E81w&usqp=CAU" /> */}
              <WriteImg />
              <TextField
                id="outlined-multiline-static"
                label="📝우리 강아지는..."
                multiline
                rows={6}
                variant="outlined"
                value={contents}
                onChange={changeContents}
              />

              <WriteSubmit onClick={addPost}>게시글 작성</WriteSubmit>
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

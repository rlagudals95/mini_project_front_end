import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import ShowMeDogPost from "../component/ShowMePost";
import { Spinner } from "../elements";
import { actionCreators as showmeActions } from "../redux/modules/showme";
import styled from "styled-components";

const ShowMeSearch = (props) => {
  const show_list = useSelector((state) => state.showme.list);
  const paging = useSelector((state) => state.showme.paging);
  const loading = useSelector((state) => state.showme.is_loading);
  const is_login = useSelector((state) => state.user.is_login);

  const dispatch = useDispatch();
  console.log(props.match.params.dog);
  const dog = props.match.params.dog;
  useEffect(() => {
    dispatch(showmeActions.findDog(dog, paging.start, paging.size));
  }, [dispatch]);
  const next = () => {
    dispatch(showmeActions.findDog(paging.start, paging.size));
  };
  return (
    <>
      <InfiniteScroll
        dataLength={show_list.length}
        next={next}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <BoastDogList>
          {show_list.map((s, idx) => {
            return <ShowMeDogPost key={s.id} {...s} />;
          })}
          {loading && <Spinner />}
        </BoastDogList>
      </InfiniteScroll>
    </>
  );
};

const BoastDogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 40px;
  margin: 200px auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  top: 400px;
  width: 980px;
  height: 100%;
  padding: 50px 200px;
  flex-wrap: wrap;
`;

export default ShowMeSearch;

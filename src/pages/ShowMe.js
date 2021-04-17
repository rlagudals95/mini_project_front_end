import React from "react";
import { Grid, Image, Input, Text } from "../elements";
import { history } from "../redux/configureStore";
import ShowMeDogPost from "../component/ShowMePost";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import showme from "../redux/modules/showme";
import { actionCreators as showmeActions } from "../redux/modules/showme";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";


const ShowMe = (props) => {
  const show_list = useSelector((state) => state.showme.list);
  const paging = useSelector((state) => state.showme.paging);
  const loading = useSelector((state) => state.showme.is_loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(showmeActions.getShowmeAX(paging.start, paging.size));
  }, []);

  const next = () => {
    dispatch(showmeActions.getShowmeAX(paging.start, paging.size));
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ShowMe;

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
  /* display: flex; */
  height: 100%;
  /* display: block; */

  /* justify-content: space-between; */
  padding: 50px 200px;
  flex-wrap: wrap;
`;

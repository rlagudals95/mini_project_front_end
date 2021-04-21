<React.Fragment>
  <PostCard>
    <LikeBox>
      {is_like ? (
        <FavoriteIcon
          padding-right="16px"
          cursor="pointer"
          color="secondary"
          onClick={dislikeSubmit}
        />
      ) : (
        <FavoriteBorderIcon
          padding-right="16px"
          cursor="pointer"
          onClick={likeSubmit}
        />
      )}
      <CntBox>{props.like_id.length}</CntBox>
      {/* 라이크 id의 length로 해주자 카운트는 props.like_id.length*/}
      {/* <FavoriteBorderIcon onClick={testLike} />0 */}
    </LikeBox>
    {is_changemodal ? (
      <ModalForChange close={closeChangeModal} {...props} />
    ) : null}
    <PostBox src={props.post_image_url} onClick={openDetailModal}></PostBox>
    {is_modal ? <BoastDogModal close={closeDetailModal} {...props} /> : null}
  </PostCard>
</React.Fragment>; //여기서 댓글 정보랑 모든걸 넘겨주려나?

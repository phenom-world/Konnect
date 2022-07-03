import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import LoadIcon from "../../images/loading.gif";
import PostCard from "../../components/PostCard";

const Post = () => {
  const { id } = useParams();

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost({ id, auth }));
  }, [id, auth, dispatch]);
  return <div className="posts">{detailPost.loading ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" /> : <PostCard post={detailPost.details} />}</div>;
};

export default Post;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import NoPost from "../images/nopost.png";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  if (result === 0)
    return (
      <div className="d-flex align-items-center justify-content-center ">
        <img src={NoPost} className="" height={"500px"} alt="no post" />
      </div>
    );
  const total_images = posts.reduce((total, item) => item.images.length + total, 0);
  return total_images > 0 ? (
    <div className="post_thumb">
      {posts.map(
        (post) =>
          !isEmpty(post.images) && (
            <Link key={post._id} to={`/post/${post._id}`}>
              <div className="post_thumb_display">
                {!isEmpty(post.images) && post.images[0].url?.match(/video/i) ? (
                  <video controls src={post.images[0].url} alt={post.images[0].url} style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
                ) : (
                  !isEmpty(post.images) && <img src={post.images[0].url} alt={post.images[0].url} style={{ filter: theme ? "invert(1)" : "invert(0)" }} />
                )}

                <div className="post_thumb_menu">
                  <i className="far fa-heart">{post.likes.length}</i>
                  <i className="far fa-comment">{post.comments.length}</i>
                </div>
              </div>
            </Link>
          )
      )}
    </div>
  ) : (
    <div className="d-flex align-items-center justify-content-center">
      <img src={NoPost} className="" height={"500px"} alt="no post" />
    </div>
  );
};

export default PostThumb;

import { FaCommentDots, FaShare, FaThumbsUp } from "react-icons/fa";

import { useProfile } from "../../contexts/profileContext";
import { usePost } from "../../contexts/postContext";
import { EditPost } from "./EditPost";
import { useState } from "react";

export const Posts = ({ posts }) => {
  const { state } = useProfile();
  const {
    setToggleEditPost,
    toggleEditPost,
    deletePostHandler,
    dispatch,
    likePostHandler,
  } = usePost();

  return (
    <div className="show__all__post">
      {toggleEditPost && <EditPost />}

      {posts.map((post) => {
        const {
          userId: { avatar, name, email, _id },
          caption,
          createdAt,
          photoUrl,
          likes,
          isLiked,
        } = post;

        return (
          <div key={post._id} className="post__main">
            <section className="post__top">
              <div className="user_sec">
                <img src={avatar} alt="" />
                <div className="user__details">
                  <h3>{name}</h3>
                  <p>{email}</p>
                </div>
                <div
                  style={{
                    display: state.profileData._id !== _id ? "none" : "block",
                  }}
                  className="delete__edit__action"
                >
                  <button
                    onClick={() => {
                      dispatch({ type: "EDIT_POST", payload: post._id });
                      setToggleEditPost(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deletePostHandler(post._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </section>
            <section className="caption">
              <p>{caption}</p>
              <img src={photoUrl} alt="" />
            </section>

            <section className="action__btns">
              <p className="like" style={{ color: isLiked ? "blue" : "" }}>
                <span>({likes})</span>{" "}
                <FaThumbsUp onClick={() => likePostHandler(post._id)} />
              </p>
              <p className="comment">
                <FaCommentDots />
              </p>
              <p className="share">
                <FaShare />
              </p>
              <p className="created__date">
                Publish at: {createdAt.slice(0, 10)}
              </p>
            </section>
          </div>
        );
      })}
    </div>
  );
};

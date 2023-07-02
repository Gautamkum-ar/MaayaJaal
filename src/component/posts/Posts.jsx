import { FaBookmark,  FaThumbsUp } from "react-icons/fa";

import { usePost } from "../../contexts/postContext";
import { EditPost } from "./EditPost";
import { Comments } from "../comments/Comment";
import { Loader } from "../loader/Loader";
import { useAuth } from "../../contexts/authContext";
import { useBookMark } from "../../contexts/bookmarkContext";

export const Posts = ({ posts }) => {
  const { userData } = useAuth();
  const { addToBookMark } = useBookMark();
  const {
    state,
    setToggleEditPost,
    toggleEditPost,
    deletePostHandler,
    dispatch,
    likePostHandler,
    isPostLoading,
  } = usePost();

  return (
    <>
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="show__all__post">
          {toggleEditPost && <EditPost />}

          {posts.map((post) => {
            const {
              userId: { avatar, name, email, _id },
              caption,
              createdAt,
              photoUrl,
              likes,
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
                        display: userData._id !== _id ? "none" : "block",
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
                  <p
                    className="like"
                    style={{
                      color: state?.likePostData.find(
                        (data) =>
                          data.userId.toString() === userData._id.toString() &&
                          data.postId === post._id &&
                          data.isLiked
                      )
                        ? "blue"
                        : "",
                    }}
                  >
                    <span>({likes})</span>{" "}
                    <FaThumbsUp onClick={() => likePostHandler(post._id)} />
                  </p>
                  {/* <p className="comment">
                <FaCommentDots />
              </p> */}
                  <p className="share">
                    <FaBookmark onClick={() => addToBookMark(post._id)} />
                  </p>
                  <p className="created__date">
                    Publish at: {createdAt.slice(0, 10)}
                  </p>
                </section>
                <Comments post={post} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

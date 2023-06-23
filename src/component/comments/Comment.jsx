import { useState } from "react";
import { usePost } from "../../contexts/postContext";
import "../comments/commentStyle.css";
import { toast } from "react-toastify";

export const Comments = ({ post, profileData }) => {
  const [commentInput, setCommentInput] = useState("");

  const { state, commentHandler, deleteCommentHandler } = usePost();

  const commentData = state?.commentData;

  return (
    <div className="comments">
      <h3>Comments</h3>
      {/* <p className="comment__icon">
          <FaCommentDots />
        </p> */}
      <div className="new__comment">
        <input
          className="comment__input"
          type="text"
          placeholder="New comment..."
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          onClick={() => {
            commentInput === ""
              ? toast.warning("Please write something")
              : commentHandler(post._id, commentInput);
          }}
        >
          Post
        </button>
      </div>
      {commentData
        .filter((comment) => comment.postId.toString() === post._id)
        .map((cmt) => {
          const {
            comment,

            userId: { avatar, _id },
          } = cmt;
          return (
            <div key={cmt._id} className="comment__card">
              <section className="comment__text">
                <p>{comment}</p>
              </section>
              <section className="comment__user">
                <img src={avatar} alt="" />
              </section>
              <button
                style={{ display: profileData._id === _id ? "block" : "none" }}
                className="delete__post__btn"
                onClick={() => deleteCommentHandler(_id)}
              >
                Delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

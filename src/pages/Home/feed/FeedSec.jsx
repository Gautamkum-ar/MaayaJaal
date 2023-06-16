import {
  FaComment,
  FaCommentAlt,
  FaCommentDots,
  FaHeart,
  FaShare,
  FaThumbsUp,
} from "react-icons/fa";
import { usePost } from "../../../contexts/postContext";
import { CreatePost } from "../../component/createPost/CreatePost";
import "../feed/feedStyle.css";

export const Feeds = () => {
  const { posts } = usePost();
  return (
    <div className="feed__container">
      <CreatePost />

      <div className="show__all__post">
        {posts.map((post) => {
          const {
            userId: { avatar, name, email },
            caption,
            createdAt,
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
                  <div className="delete__edit__action">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                </div>
              </section>
              <section className="caption">
                <p>{caption}</p>
              </section>

              <section className="action__btns">
                <p className="like">
                  <FaThumbsUp />
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
    </div>
  );
};

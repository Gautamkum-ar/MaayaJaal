import { toast } from "react-toastify";
import { usePost } from "../../../contexts/postContext";

export const CreatePost = () => {
  const { setCreatePost, createPost, createPostHandler } = usePost();
  const avatar = localStorage.getItem("avatar");
  return (
    <div className="create__post__container">
      <section className="create__post_top">
        <div className="profile_sec">
          <img src={avatar} alt="UP" />
        </div>
        <div className="input__field">
          <textarea
            name=""
            cols="15"
            rows="8"
            placeholder="What's happening...."
            onChange={(e) =>
              setCreatePost({ ...createPost, caption: e.target.value })
            }
          ></textarea>
        </div>
      </section>
      <section className="create__post__bottom">
        <input type="file" />
        <button
          className="create__new_post"
          onClick={() => {
            createPost.caption === ""
              ? toast.warning("Please write something")
              : createPostHandler();
          }}
        >
          Create post
        </button>
      </section>
    </div>
  );
};

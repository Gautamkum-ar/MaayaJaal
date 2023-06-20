import { toast } from "react-toastify";
import { usePost } from "../../../contexts/postContext";

export const CreatePost = () => {
  const { setCreatePost, createPost, createPostHandler } = usePost();

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setCreatePost({ ...createPost, imageUrl: reader.result });
    };
  };
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
            value={createPost.caption}
            placeholder="What's happening...."
            onChange={(e) =>
              setCreatePost({ ...createPost, caption: e.target.value })
            }
          ></textarea>
        </div>
      </section>
      <section className="create__post__bottom">
        <input
          type="file"
          accept="image"
          onChange={(e) => {
            e.target.files[0].size > 5e6
              ? toast.warning("Image size must be less then 5mb")
              : handleImage(e);
          }}
        />
        <button
          className="create__new_post"
          onClick={() => {
            createPost.caption === ""
              ? toast.warning("Please write something")
              : createPostHandler();
            setCreatePost({ ...createPost, caption: "", imageUrl: "" });
          }}
        >
          Create post
        </button>
      </section>
    </div>
  );
};

import { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

import { usePost } from "../../../contexts/postContext";
import { useAuth } from "../../../contexts/authContext";

export const CreatePost = () => {
  const [toggleEmojis, setToggleEmojis] = useState(false);
  const [emoji, setEmoji] = useState("");

  console.log(emoji);

  const { setCreatePost, createPost, createPostHandler } = usePost();
  const { state } = useAuth();

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setCreatePost({ ...createPost, imageUrl: reader.result });
    };
  };
  const avatar = state.userData.avatar;

  return (
    <div className="create__post__container">
      <section className="create__post_top">
        <div className="profile_sec">
          <img src={avatar} alt="UP" />
          <Emoji />
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
          />
          <p>
            <Emoji unified="" size="25" />
          </p>
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

        <p>
          <BsEmojiSmile onClick={(e) => setToggleEmojis(!toggleEmojis)} />{" "}
          {toggleEmojis && (
            <div className="emoji__picker">
              <span onClick={() => setToggleEmojis(false)}>X</span>
              <EmojiPicker />
            </div>
          )}{" "}
        </p>
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

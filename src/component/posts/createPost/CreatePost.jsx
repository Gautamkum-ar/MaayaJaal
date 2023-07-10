import { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";

import { usePost } from "../../../contexts/postContext";
import { useAuth } from "../../../contexts/authContext";

export const CreatePost = () => {
  const [toggleEmojis, setToggleEmojis] = useState(false);
  const [emoji, setEmoji] = useState("");

  const { setCreatePost, createPost, createPostHandler } = usePost();
  const { state } = useAuth();

  //converting image file to base64

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setCreatePost({ ...createPost, imageUrl: reader.result });
    };
  };
  const avatar = state.userData.avatar;

  const handleRemoveMedia = () =>
    setCreatePost({ ...createPost, imageUrl: "" });

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
          {createPost.imageUrl && (
            <div className="create_post__media">
              <button className="remove__media" onClick={handleRemoveMedia}>
                X
              </button>
              <img src={createPost.imageUrl} alt="createpost" />
            </div>
          )}
          <p>
            <Emoji unified="" size="25" />
          </p>
        </div>
      </section>
      <section className="create__post__bottom">
        <label>
          <BiImageAdd />
          <input
            type="file"
            accept="image"
            onChange={(e) => {
              e.target.files[0].size > 5e6
                ? toast.warning("Image size must be less then 5mb")
                : handleImage(e);
            }}
          />
        </label>

        <p className="emoji">
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
          <AiOutlineSend />
        </button>
      </section>
    </div>
  );
};

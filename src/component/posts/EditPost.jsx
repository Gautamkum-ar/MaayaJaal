import { toast } from "react-toastify";
import { usePost } from "../../contexts/postContext";

import "../posts/style.css";
export const EditPost = () => {
  const {
    setEditPostData,
    editPostData,
    editPosthandler,
    setToggleEditPost,
    state,
  } = usePost();

  const avatar = localStorage.getItem("avatar");
  const { caption, _id } = state?.editpost;
  return (
    <div className="edit__post__container">
      <div className="edit__post__main">
        <h2 className="__heading">Updating Post</h2>{" "}
        <button
          className="close__edit__post"
          onClick={() => setToggleEditPost(false)}
        >
          X
        </button>
        <section className="edit__post_top">
          <div className="profile_sec">
            {/* <img src={avatar} alt="UP" /> */}
          </div>
          <div className="input__field">
            <textarea
              name=""
              cols="15"
              rows="8"
              value={editPostData.caption ? editPostData.caption : caption}
              placeholder="What's happening...."
              onChange={(e) =>
                setEditPostData({ ...editPostData, caption: e.target.value })
              }
            ></textarea>
          </div>
        </section>
        <section className="create__post__bottom">
          <input type="file" />
          <button
            className="create__new_post"
            onClick={() => {
              editPostData.caption === ""
                ? toast.warning("Please write something")
                : editPosthandler(_id);
              setToggleEditPost(false);
            }}
          >
            Edit post
          </button>
        </section>
      </div>
    </div>
  );
};

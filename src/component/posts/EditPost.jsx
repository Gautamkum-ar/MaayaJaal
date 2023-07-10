import { toast } from "react-toastify";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

import { usePost } from "../../contexts/postContext";

import "../posts/style.css";
export const EditPost = () => {
  const { editPosthandler, setToggleEditPost, state } = usePost();
  const [editPostData, setEditPostData] = useState({
    ...state.editpost,
  });


  //converting img to base64 function

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setEditPostData({ ...editPostData, photoUrl: reader.result });
    };
  };
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
          <div className="input__field">
            <textarea
              name=""
              value={editPostData.caption}
              placeholder=""
              onChange={(e) =>
                setEditPostData({ ...editPostData, caption: e.target.value })
              }
            />
            {editPostData.photoUrl && (
              <div className="edit_post__media">
                <button
                  className="remove__media"
                  onClick={() =>
                    setEditPostData({ ...editPostData, photoUrl: "" })
                  }
                >
                  X
                </button>
                <img src={editPostData.photoUrl} alt="editpost" />
              </div>
            )}
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
          <button
            className="create__new_post"
            onClick={() => {
              editPostData.caption === ""
                ? toast.warning("Please write something")
                : editPosthandler(editPostData);
              setToggleEditPost(false);
            }}
          >
            update
          </button>
        </section>
      </div>
    </div>
  );
};

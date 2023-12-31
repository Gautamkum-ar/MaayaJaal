import { FilterBox } from "../../../component/filter/Filter";
import { Posts } from "../../../component/posts/Posts";
import { CreatePost } from "../../../component/posts/createPost/CreatePost";
import { usePost } from "../../../contexts/postContext";

import "../feed/feedStyle.css";

export const Feeds = () => {
  const { state } = usePost();
  const posts = state?.postData;
  const likePostData = state?.likePostData;

  return (
    <div className="feed__container">
      <div className="filters__mobile">
        <FilterBox />
      </div>
      <CreatePost />
      <Posts posts={posts} likePostData={likePostData} />
    </div>
  );
};

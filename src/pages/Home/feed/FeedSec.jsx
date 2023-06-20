import { Posts } from "../../../component/posts/Posts";
import { CreatePost } from "../../../component/posts/createPost/CreatePost";
import { usePost } from "../../../contexts/postContext";

import "../feed/feedStyle.css";

export const Feeds = () => {
  const { state } = usePost();
  const posts = state?.postData;
  return (
    <div className="feed__container">
      <CreatePost />
      <Posts posts={posts} />
    </div>
  );
};

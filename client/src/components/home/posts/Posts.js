import { useState, useEffect } from "react";
import Post from "./Post";

const Posts = ({ posts, setChange }) => {
  const [allPosts, setPosts] = useState(posts);

  // need to call this because we initially pass in 0 posts but once getProfile finishes running it changes props
  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  // first need to make sure there are any posts/a user logged in, then check if there are any posts
  return (
    <div>
      {allPosts.length !== 0 &&
        allPosts.post_id !== null &&
        allPosts.map((post) => (
          <Post key={post.post_id} post={post} setChange={setChange} />
        ))}
    </div>
  );
};

export default Posts;

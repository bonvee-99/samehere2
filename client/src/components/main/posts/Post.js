import { Button } from "react-bootstrap";
import Edit from "./Edit";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { toast } from "react-toastify";
import styles from "./Post.module.css";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

toast.configure();

const Post = ({ post, setChange }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const deletePost = async () => {
    try {
      const response = await fetch(`/home/posts/${post.post_id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      const json = await response.json();
      if (json === "Success!") {
        toast.success("Post was deleted!");
      } else {
        toast.error(json);
      }

      setChange(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadComments = async () => {
    try {
      const comments = await fetch(`/home/comments/post/${post.post_id}`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const json = await comments.json();
      setComments(json);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleComments = async () => {
    if (showComments) {
      setShowComments(false);
    } else {
      await loadComments();
      setShowComments(true);
    }
  };

  return (
    <div className={styles.post}>
      <div>
        (
        <span>{`@${post.post_time.slice(11, 16)} ${post.post_time.slice(
          0,
          10
        )}`}</span>
        )
      </div>

      <Button variant="link" className={styles.delete} onClick={deletePost}>
        <FaTrashAlt />
      </Button>

      <p className={styles.postText}>{post.description}</p>

      {showComments && comments.length !== 0 && (
        <Comments comments={comments} loadComments={loadComments} />
      )}
      <div className={styles.control}>
        {showComments && (
          <AddComment id={post.post_id} loadComments={loadComments} />
        )}
        <Button variant="link" onClick={toggleComments}>
          Comments
        </Button>
        <Edit post={post} setChange={setChange} />
      </div>
    </div>
  );
};

export default Post;

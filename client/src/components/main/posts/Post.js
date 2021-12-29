import { Button } from "react-bootstrap";
import Edit from "./Edit";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { toast } from "react-toastify";
import styles from "./Post.module.css";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { deletePost } from "../../../feature/profileSlice";

toast.configure();

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const deleteMyPost = async () => {
    const resultAction = await dispatch(
      deletePost({ id: post.post_id, token: localStorage.token })
    );
    if (deletePost.fulfilled.match(resultAction)) {
      if (resultAction.payload === "Success!") {
        toast.success("Post was deleted!");
      } else {
        toast.error(resultAction.payload);
      }
    }
  };

  const loadComments = async () => {
    try {
      const comments = await fetch(`/home/comments/post/${post.post_id}`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      console.log("reaching here");
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
        <span>{`@${post.post_time.slice(11, 16)} ${post.post_time.slice(
          0,
          10
        )}`}</span>
      </div>

      {post.owned && (
        <Button variant="link" className={styles.delete} onClick={deleteMyPost}>
          <FaTrashAlt />
        </Button>
      )}

      <p className={styles.postText}>{post.description}</p>

      {showComments && comments.length !== 0 && (
        <Comments comments={comments} loadComments={loadComments} />
      )}
      <div className={styles.control}>
        {showComments && (
          <AddComment id={post.post_id} loadComments={loadComments} />
        )}
        {post.owned && <Edit post={post} />}
        <Button variant="link" onClick={toggleComments}>
          Comments
        </Button>
      </div>
    </div>
  );
};

export default Post;

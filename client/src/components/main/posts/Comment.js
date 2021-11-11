import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Comment = ({ comment, loadComments }) => {
  const deleteComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/home/comments/${comment.comm_id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );
      const json = await response.json();
      if (json === true) {
        toast.success("Comment was deleted!");
        loadComments();
      } else {
        toast.error(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ marginBottom: "1em" }}>
      <p>{comment.description}</p>
      <Button style={{ fontSize: "0.5rem" }} onClick={deleteComment}>
        Delete
      </Button>
    </div>
  );
};

export default Comment;

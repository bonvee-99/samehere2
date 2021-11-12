import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

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
    <div
      style={{
        position: "relative",
        marginBottom: "2em",
        borderRight: "3px solid black",
      }}
    >
      <p style={{ width: "90%" }}>{comment.description}</p>
      <Button
        variant="link"
        style={{ fontSize: "0.5rem", position: "absolute", right: 0, top: 0 }}
        onClick={deleteComment}
      >
        <FaTrashAlt />
      </Button>
    </div>
  );
};

export default Comment;

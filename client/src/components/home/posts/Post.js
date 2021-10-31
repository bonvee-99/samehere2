import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Post.module.css";

toast.configure();

const Post = ({ post, setChange }) => {
  const [text, setText] = useState(post.description);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setText(post.description);
  };

  const handleShow = () => {
    setShow(true);
  };

  const deletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/home/posts/${post.post_id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );
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

  const edit = async (description) => {
    try {
      const body = { description };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const response = await fetch(
        `http://localhost:5000/home/posts/${post.post_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const json = await response.json();

      if (json === "Success!") {
        toast.success("Edit was successful!");
      } else {
        toast.error("That is not your post!");
      }

      setChange(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async () => {
    if (text.length > 0 && text.length <= 250) {
      edit(text);
      setShow(false);
      setText(text);
    }
  };

  return (
    <div className={styles.post}>
      <div className={styles.editTimeCtn}>
        <Button variant="warning" onClick={handleShow}>
          Edit
        </Button>
        <span>{`posted/edited @ ${post.post_time.slice(
          11,
          16
        )} ${post.post_time.slice(0, 10)}`}</span>
      </div>

      <Button variant="danger" className={styles.delete} onClick={deletePost}>
        Delete Post
      </Button>

      <p className={styles.postText}>{post.description}</p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit my post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              aria-label="Small"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Post;

import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

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

  const handleSubmit = () => {
    if (text.length > 0) {
      edit(text);
      setShow(false);
      setText(post.description);
    }
  };

  return (
    <div>
      <p>{post.description}</p>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
        <span>{`posted/edited @ ${post.post_time.slice(
          11,
          16
        )} ${post.post_time.slice(0, 10)}`}</span>
      </div>

      <Button onClick={deletePost}>Delete Post</Button>

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

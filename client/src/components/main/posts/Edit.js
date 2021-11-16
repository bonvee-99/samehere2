import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

toast.configure();

const Edit = ({ post, setChange }) => {
  const [text, setText] = useState(post.description);
  const [show, setShow] = useState(false);

  const edit = async (description) => {
    try {
      const body = { description };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const response = await fetch(`/home/posts/${post.post_id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const json = await response.json();

      if (json === true) {
        toast.success("Edit was successful!");
        setText(text);
      } else {
        toast.error(json);
        setText(post.description);
      }

      setChange(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = () => {
    if (text.length > 0 && text.length <= 250) {
      edit(text);
      setShow(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setText(post.description);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Edit
      </Button>
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
    </>
  );
};

export default Edit;

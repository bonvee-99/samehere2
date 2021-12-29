import { useState } from "react";
import { Modal, FormControl, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { createPost } from "../../../feature/profileSlice";

toast.configure();

const CreatePost = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setText("");
  };

  const handleShow = () => {
    setShow(true);
  };

  const post = async (description) => {
    const resultAction = await dispatch(
      createPost({ description, token: localStorage.token })
    );
    if (createPost.fulfilled.match(resultAction)) {
      if (resultAction.payload === true) {
        toast.success("Post was successful!");
      } else {
        toast.error(resultAction.payload);
      }
    }
  };

  const handleSubmit = () => {
    if (text.length > 0 && text.length <= 250) {
      post(text);
      setShow(false);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post (under 250 characters)</Modal.Title>
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
            Create Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePost;

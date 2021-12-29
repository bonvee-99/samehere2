import { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { editPost } from "../../../feature/profileSlice";

toast.configure();

const Edit = ({ post }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState(post.description);
  const [show, setShow] = useState(false);

  const edit = async (description) => {
    const resultAction = await dispatch(
      editPost({ description, id: post.post_id, token: localStorage.token })
    );
    if (editPost.fulfilled.match(resultAction)) {
      if (resultAction.payload === true) {
        toast.success("Edit was successful!");
      } else {
        toast.error(resultAction.payload);
      }
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

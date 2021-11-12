import { useState } from "react";
import { Modal, FormControl, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

toast.configure();

const AddComment = ({ id, loadComments }) => {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setText("");
  };

  const handleShow = () => {
    setShow(true);
  };

  const addComment = async (description) => {
    try {
      const body = { description };
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const comment = await fetch(
        `http://localhost:5000/home/comments/post/${id}`,
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const json = await comment.json();

      if (json === true) {
        toast.success("Comment was added!");
        loadComments();
      } else {
        toast.error(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = () => {
    if (text.length > 0 && text.length <= 250) {
      addComment(text);
      setShow(false);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Add Comment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment (under 250 characters)</Modal.Title>
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
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddComment;

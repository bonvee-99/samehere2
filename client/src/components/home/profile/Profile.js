import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";

const Profile = ({ profile, logout }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Profile
      </Button>

      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div>{profile.user_name}</div>
            <p style={{ color: "lightgrey" }}>@{profile.user_email}</p>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button variant="warning" onClick={logout}>
            Logout
          </Button>
          <Button variant="danger">Delete Account</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Profile;

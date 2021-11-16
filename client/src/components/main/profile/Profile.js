import { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { toast } from "react-toastify";

toast.configure();

const Profile = ({ profile, logout }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAccount = async () => {
    try {
      const account = await fetch("/auth/user", {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      const json = await account.json();

      if (json === true) {
        toast.success("Account was deleted!");
      } else {
        toast.error("Unable to delete account!");
      }

      logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
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
          <Button variant="danger" onClick={deleteAccount}>
            Delete Account
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Profile;

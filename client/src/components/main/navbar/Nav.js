import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "../profile/Profile";
import CreatePost from "../posts/CreatePost";

const Navigation = ({ profile }) => {
  return (
    <Navbar style={{ backgroundColor: "#EAEBED" }} sticky="top">
      <Container>
        <Nav className="me-auto">
          <Link to="/resources">
            <Button variant="link">Resources</Button>
          </Link>

          <CreatePost />

          <Profile profile={profile} />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;

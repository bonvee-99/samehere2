import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container fluid className="bg-light mt-5 p-5 text-center">
      <h1>Welcome!</h1>
      <Link to="/login" className="mx-3">
        <Button>Login</Button>
      </Link>
      <Link to="/register" className="mx-3">
        <Button>Register</Button>
      </Link>
    </Container>
  );
};

export default Welcome;

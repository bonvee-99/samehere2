import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  return (
    <Container fluid className="bg-light mt-5 p-5 text-center">
      <h1>Home page</h1>
      <Button>Logout</Button>
    </Container>
  );
};

export default Home;

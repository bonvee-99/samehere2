import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState(false);

  const getProfile = async () => {
    try {
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getProfile();
    setChange(false);
  }, [change]);

  return (
    <Container fluid className="bg-light mt-5 p-5 text-center">
      <h1>Browse Page</h1>
      <Button>Login!</Button>
    </Container>
  );
};

export default Home;

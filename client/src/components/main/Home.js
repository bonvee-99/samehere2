import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Posts from "./posts/Posts";
import Navbar from "./navbar/Nav";

toast.configure();

const Home = ({ setAuth }) => {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [change, setChange] = useState(false);

  const logout = (e) => {
    // e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/home", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      setPosts(parseResponse);
      const { user_name, user_email } = parseResponse[0];
      setProfile({ user_name, user_email });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
    setChange(false);
  }, [change]);

  return (
    <div style={{ backgroundColor: "#00A1E4", paddingBottom: "1em" }}>
      <Navbar profile={profile} logout={logout} setChange={setChange} />
      <Container fluid className="bg-light mt-5 p-5 text-center mb-5">
        <h1>News and Announcements!</h1>
      </Container>
      <Posts setChange={setChange} posts={posts} />
    </div>
  );
};

export default Home;

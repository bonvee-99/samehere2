import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Posts from "./posts/Posts";
import Navbar from "./navbar/Nav";
import styles from "./Home.module.css";

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
    <div className={styles.container}>
      <Navbar profile={profile} logout={logout} setChange={setChange} />
      <Container
        fluid
        className="bg-light my-5 p-4 text-center"
        style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <h1>Same Here</h1>
        <h2>News and Announcements!</h2>
      </Container>
      <Posts setChange={setChange} posts={posts} />
    </div>
  );
};

export default Home;

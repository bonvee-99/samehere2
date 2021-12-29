import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Posts from "./posts/Posts";
import Navbar from "./navbar/Nav";
import styles from "./Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../feature/profileSlice";

toast.configure();

const Home = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const posts = useSelector((state) => state.profile.posts);
  const change = useSelector((state) => state.profile.change);

  useEffect(() => {
    dispatch(setProfile({ token: localStorage.token }));
  }, [change, dispatch]);

  return (
    <div className={styles.container}>
      <Navbar profile={profile} />
      <Container
        fluid
        className="bg-light my-5 p-4 text-center"
        style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
      >
        <h1>Same Here</h1>
        <h2>News and Announcements!</h2>
      </Container>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import LandingImage from "./LandingImage";
import styles from "./Card.module.css";

toast.configure();

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        setAuth(true);
        toast.success("login successfully!");
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logincard}>
        <LandingImage />
        <div className={`text-center ${styles.login}`}>
          <h1>Login</h1>
          <Link to="/register">
            <Button variant="link">Create Account</Button>
          </Link>
          <Form onSubmit={onSubmitForm}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mx-5 mb-2"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={onChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mx-5 mb-2"
            >
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </FloatingLabel>
            <Button variant="success" type="submit" className="mt-5">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

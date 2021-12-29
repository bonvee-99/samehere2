import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FloatingLabel, ToastContainer } from "react-bootstrap";
import { toast } from "react-toastify";
import LandingImage from "./LandingImage";
import styles from "./Card.module.css";

import { useDispatch } from "react-redux";
import { login } from "../../feature/authenticationSlice";

toast.configure();

const Login = () => {
  const dispatch = useDispatch();

  const [showSendLink, setShowSendLink] = useState(false);

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
    const body = { email, password };
    const resultAction = await dispatch(login({ body }));
    // if resultAction matches fulfilled
    if (login.fulfilled.match(resultAction)) {
      if (resultAction.payload.token) {
        toast.success("login successful");
      } else {
        toast.error(resultAction.payload);
        if (resultAction.payload === "Please confirm email!") {
          setShowSendLink(true);
        }
      }
    } else {
      console.error("resultAction.payload");
    }
  };

  // sends user new verification code
  const sendNewVerification = async () => {
    try {
      const body = { email };

      const response = await fetch("/auth/confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      if (parseResponse === true) {
        toast.success(`A new verification link was sent to ${email}`);
      } else {
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
            {showSendLink && (
              <Button
                onClick={sendNewVerification}
                variant="warning"
                className="mt-5"
              >
                Send Verification
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

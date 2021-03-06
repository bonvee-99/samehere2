import { Link } from "react-router-dom";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Card.module.css";

import { useDispatch } from "react-redux";
import { register } from "../../feature/authSlice";
import { useHistory } from "react-router-dom";

toast.configure();

const Register = () => {
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      if (parseResponse === true) {
        toast.success("Registration successful. Please verify email");
        history.push("/");
      } else {
        toast.error(parseResponse);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00A1E4",
      }}
    >
      <div className={styles.registercard}>
        <div className={`text-center ${styles.register}`}>
          <h1>Register</h1>
          <Link to="/" className="m-2">
            <Button variant="link">Login</Button>
          </Link>
          <Form onSubmit={onSubmitForm}>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mx-5 mb-2"
            >
              <Form.Control
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </FloatingLabel>
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
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;

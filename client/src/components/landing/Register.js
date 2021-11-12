import { Link } from "react-router-dom";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Card.module.css";
import LandingImage from "./LandingImage";

toast.configure();

const Register = ({ setAuth }) => {
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
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
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

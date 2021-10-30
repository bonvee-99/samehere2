import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";

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
      const response = await fetch("http://localhost:5000/auth/login", {
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
    <>
      <Container fluid className="bg-light mt-5 p-5 text-center">
        <h1>Login</h1>
        <Link to="/register" className="m-2">
          <Button>Register</Button>
        </Link>
        <Link to="/home/browse" className="m-2">
          <Button>Browse</Button>
        </Link>
      </Container>
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
        <Button variant="success" type="submit" className="m-5">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";

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
    <>
      <Container fluid className="bg-light mt-5 p-5 text-center">
        <h1>Register</h1>
        <Link to="/login" className="m-2">
          <Button>Login</Button>
        </Link>
      </Container>
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
        <Button variant="success" type="submit" className="m-5">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;

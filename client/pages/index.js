import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

// -----> Welcome Page -----> //
export default function Home() {
  return (
    <Container fluid>
      <Row>
        <Col lg={1}>
          <h1>Welcome!</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Link href="/login">Login</Link>
        </Col>
        <Col md={6}>
          <Link href="/register">Register</Link>
        </Col>
      </Row>
    </Container>
  );
}

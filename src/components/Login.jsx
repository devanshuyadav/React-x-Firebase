import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
  Image,
  FloatingLabel,
} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, GoogleSignup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleSubmit() {
    try {
      setError("");
      setLoading(true);
      await GoogleSignup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Couldn't create an account with google!");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to Log you in!");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body style={{ padding: "0" }}>
          <Container>
            <Row>
              <Col
                md="4"
                className="d-none d-md-block"
                style={{ padding: "0", overflow: "hidden", maxHeight: "60vh" }}
              >
                <Image src="https://images.unsplash.com/photo-1618331833071-ce81bd50d300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBhcnR8ZW58MHx8MHx8&w=1000&q=80" />
              </Col>
              <Col md="8" className="px-5 py-3">
                <h4 className="text-left mb-4">Log in</h4>
                {/* {JSON.stringify(currentUser)} */}
                {/* {currentUser.email} */}
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="mb-5">
                  <Button
                    className="d-flex align-items-center rounded-pill"
                    variant="light"
                    onClick={handleGoogleSubmit}
                  >
                    <FcGoogle className="mx-3" />
                    Log In with Google
                  </Button>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Email">
                      <Form.Control
                        type="email"
                        ref={emailRef}
                        placeholder="EMAIL"
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group id="password" className="mb-3">
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                    >
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        placeholder="password"
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Button disabled={loading} type="submit" className="w-100">
                    Log In
                  </Button>
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="w-100 text-center mt-2">
                  Create an account instead? <Link to="/signup">Sign Up!</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
}

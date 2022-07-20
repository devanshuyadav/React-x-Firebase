import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, GoogleSignup } = useAuth();
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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Can't confirm password!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Couldn't create an account!");
    }
    setLoading(false);
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card>
        <Card.Body
          style={{
            padding: "0",
            boxShadow: "2px 2px 10px -2px rgba(0,0,0,0.75)",
            maxWidth: "800px",
          }}
        >
          <Container>
            <Row>
              <Col
                md="4"
                className="d-none d-md-block"
                style={{ padding: "0", overflow: "hidden", maxHeight: "70vh" }}
              >
                <Image src="https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
              </Col>
              <Col md="8" className="px-5 py-3">
                <h4 className="text-left mb-4">Sign Up</h4>
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

                  <Form.Group id="password-confirm" className="mb-3">
                    <FloatingLabel
                      controlId="floatingConfirmPassword"
                      label="Confirm Password"
                    >
                      <Form.Control
                        type="password"
                        ref={passwordConfirmRef}
                        placeholder="confirm password"
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>

                  <Button disabled={loading} type="submit" className="w-100">
                    Sign Up
                  </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                  Already have an account? <Link to="/login">Log in</Link>.
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
}

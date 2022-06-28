import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check you inbox!");
    } catch {
      setError("Failed to Reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset </h2>
          {/* {JSON.stringify(currentUser)} */}
          {/* {currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100 mt-4">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mb-3">
          <Link to="/login">Log in</Link>
        </div>
      </Card>
      <div className="w-100 text-center mt-2">
        Create an account instead? <Link to="/signup">Sign Up!</Link>
      </div>
    </>
  );
}

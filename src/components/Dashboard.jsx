import React, { useState } from "react";
import {
  Card,
  Button,
  Alert,
  Navbar,
  Container,
  Nav,
  Image,
  NavDropdown,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out!");
    }
  }

  return (
    <>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="#home">React x Firebase</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="align-items-center">
              <Nav.Link>
                <Image
                  src={currentUser.photoURL}
                  height="40px"
                  className="rounded-circle"
                />
              </Nav.Link>
              {currentUser.displayName}
            </Nav>
            <NavDropdown title="Profile" id="collasible-nav-dropdown">
              <Link className="dropdown-item" to="/update-profile">
                Update Profile
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <div variant="text" onClick={handleLogout}>
                  Log Out
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Card>
        <Card.Body className="text-center">
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card> */}
      {/* Log out */}
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </>
  );
}

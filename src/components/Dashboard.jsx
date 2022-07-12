import React, { useState } from "react";
import {
  Alert,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";
import { FiEdit3, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

  // custom Dropdown toggle
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <>
      <Nav.Link
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        <Image
          src={currentUser.photoURL}
          height="40px"
          width="40px"
          className="rounded-circle mx-3"
          alt="Profile image"
          referrerpolicy="no-referrer"
        />
      </Nav.Link>
    </>
  ));

  // Custom dropdown menu
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

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
            <Nav className="me-auto">
              {error && <Alert variant="danger">{error}</Alert>}
            </Nav>

            <Dropdown align="end" id="dropdown-menu-align-end">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                {/* {currentUser.displayName} */}
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                <NavDropdown.Item disabled="true">
                  Welcome, {currentUser.displayName}
                </NavDropdown.Item>

                <Link className="dropdown-item mt-3" to="/update-profile">
                  <FiEdit3 className="me-3" />
                  Edit Profile
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item className="text-danger">
                  <FiLogOut className="me-3" />
                  <span className="ml-3" variant="text" onClick={handleLogout}>
                    Log Out
                  </span>
                </NavDropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Image
        width="100%"
        // src="https://cdn-media-1.freecodecamp.org/images/kE3b4TOXtlEYpwhRvtSMi87mkWPaTfzbWOC9"
      />
    </>
  );
}

import React, { useState } from "react";
import {
  Alert,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { BsMouse } from "react-icons/bs";
import { FiEdit3, FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

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
        className="d-flex flex-row profile-dropdown-toggle align-items-center"
      >
        {children}
        <Image
          src={currentUser.photoURL}
          height="40px"
          width="40px"
          className="rounded-circle me-3"
          alt="Profile image"
          referrerPolicy="no-referrer"
        />
        <span>
          <div>{currentUser.displayName}</div>
          <div className="small-text">{currentUser.email}</div>
        </span>
        <IoIosArrowDown className="ms-3" />
      </Nav.Link>
    </>
  ));

  // Custom dropdown menu
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      // eslint-disable-next-line
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled mb-0">
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
          <Navbar.Brand className="big-heading" href="#home">
            React x Firebase
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {error && <Alert variant="danger">{error}</Alert>}
            </Nav>

            <Dropdown align="end" id="dropdown-menu-align-end">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              ></Dropdown.Toggle>

              <Dropdown.Menu className="w-100" as={CustomMenu}>
                <NavDropdown.Item
                  className="heading"
                  style={{ color: "#000" }}
                  disabled="true"
                >
                  Welcome,{" "}
                  {currentUser.displayName.split(" ").slice(0, 1).join(" ")}
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
                <NavDropdown.Item disabled="true">
                  © 2022 devanshuyadav
                </NavDropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main
        className="position-relative text-center pt-5"
        style={{
          marginTop: "70px",
          height: "calc(100vh - 70px)",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "1%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="bigger-heading"
        >
          Welcome to
        </span>
        <span
          style={{
            position: "absolute",
            top: "40%",
            transform: "translate(-50%, -50%) scale(2)",
            zIndex: "2",
          }}
        >
          &times;
        </span>
        <span
          className="firebase"
          style={{
            position: "absolute",
            top: "40%",
            width: "100%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image src="https://drive.google.com/uc?id=1Cx5Q42vatN2djZXzfzgDMrTzMeO4sn_9" />
        </span>

        <span
          className="react"
          style={{
            position: "absolute",
            top: "40%",
            width: "100%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            style={{
              animation: "rotate 6s linear infinite",
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          />
        </span>
        <span
          className="position-absolute"
          style={{
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <BsMouse
            style={{ animation: "swing 0.6s infinite alternate ease-out" }}
          />
          <br />
          Scroll down for more
        </span>
      </main>
      <HeroSection />
      <Footer />
    </>
  );
}

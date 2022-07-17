import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import dropdownImg from "../Dropdown-Menu.png";

export default function HeroSection() {
  return (
    <>
      <div className="text-center" style={{ height: "calc(100vh - 80px)" }}>
        <p className="big-heading">
          While you're still here <br /> you can ...
        </p>
        <Container className="w-75 mt-5">
          <Row>
            <Col md={4} sm={12} className="mx-auto mb-5">
              <Image
                style={{
                  boxShadow: "2px 2px 10px -2px rgba(0,0,0,0.75)",
                  borderRadius: "8px",
                }}
                className="w-100"
                src={dropdownImg}
              />
            </Col>
          </Row>
          <Row>
            <Col md={4} className="ms-auto">
              <div className="heading">Edit Profile</div>
              <p>
                Uses the{" "}
                <code>
                  <a href="https://firebase.google.com/docs/auth/web/manage-users#set_a_users_email_address">
                    updateEmail()
                  </a>
                </code>{" "}
                &amp;{" "}
                <code>
                  <a href="https://firebase.google.com/docs/auth/web/manage-users#set_a_users_password">
                    updatePassword()
                  </a>
                </code>{" "}
                methods provided by Firebase.
              </p>
            </Col>
            <Col md={4} className="me-auto">
              <div className="heading">Log Out</div>
              <p>
                Logs you out of the current active session through Firebase's{" "}
                <code>
                  <a href="https://firebase.google.com/docs/auth/web/password-auth#next_steps">
                    signOut()
                  </a>
                </code>{" "}
                method.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

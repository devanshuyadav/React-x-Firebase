import React from "react";
import { Container } from "react-bootstrap";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-5 bg-dark text-light"
    >
      <span className="heading px-5">React x Firebase</span>
      <span>
        © devanshuyadav, {new Date().getFullYear()}. All rights reserved.
      </span>
      <span className="px-5">
        <a className="ms-3" href="https://www.linkedin.com/in/devanshuyadav16/">
          <FaLinkedin size={20} />
        </a>
        <a className="ms-3" href="https://github.com/devanshuyadav">
          <FaGithub size={20} />
        </a>
      </span>
    </Container>
  );
}

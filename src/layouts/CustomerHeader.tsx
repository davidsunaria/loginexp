import React from "react";
import {  Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useStoreActions } from "../store";



const CustomerHeader = () => {
  const logout = useStoreActions((actions) => actions?.authModel?.logout);
 
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/homePage/about" className="mx-4">
                About us
              </Link>
              <Link to="/homePage/shop" className="mx-4">
                Shop
              </Link>
            </Nav>
            <button className="btn btn-danger" onClick={() => logout(true)}>
              LogOut
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomerHeader;

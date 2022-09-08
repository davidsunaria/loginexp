import React from "react";
import {  Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useStoreActions } from "../store";
import Badge from 'react-bootstrap/Badge';



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
                Categories
              </Link>
             
            </Nav>
            <i className="bi bi-cart-plus-fill" style={{ fontSize: 25 }}> </i>
            <Badge bg="secondary" className="cart-count">9</Badge>
            <button className="btn btn-danger  mx-4" onClick={() => logout(true)}>
              LogOut
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomerHeader;

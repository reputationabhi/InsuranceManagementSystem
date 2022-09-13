import React from "react";
import  {Navbar, Nav} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

const Menu = () => {
  return (
    <div>
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#help">Help</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
};

export default Menu;

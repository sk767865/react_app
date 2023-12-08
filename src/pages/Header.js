import React from 'react';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#6e2cf2" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>


            <b>Welcome to The Blog Post App</b>
            <img
              src={process.env.PUBLIC_URL + "/SvgData/rocket-svgrepo-com.svg"}
              alt="Notebook"
              width="3%"
              height="3%"

            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/add-blog" style={{ textDecoration: 'none' }}>
              <Button variant="light"><b>Add Blogs</b></Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;









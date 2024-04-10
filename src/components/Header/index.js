import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from 'react-router-dom';
import "./index.css";
import { useState } from 'react';

function Header(props) {
  const {handleSearch} = props
  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchInput);
  };

  return (
    <Navbar expand="lg" className="nav-conatiner" data-bs-theme="dark">
      <Container>
        <Link to="/" className="link-name">
        <Navbar.Brand>MovieDb</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            moviedb="true"
          ></Nav>
          <Nav>
            <Nav.Link href="/">Popular</Nav.Link>
            <Nav.Link href="/toprated">Top Rated</Nav.Link>
            <Nav.Link href="/upcomming">Upcoming</Nav.Link> 
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Movie Name"
                className="me-2 bg-white text-dark search-input"
                aria-label="Search"
                
                value={searchInput}
                onChange={handleInputChange}
              />
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
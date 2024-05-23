import React from "react";
import './NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

export default function NavigationBar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="logo">chattpatte</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
                        <NavDropdown title="Menu" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/">Chattpatte</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/">
                                Paanipuri
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                        <Nav.Link as={Link} to="/cartDetails"><FontAwesomeIcon icon={faShoppingCart} /></Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

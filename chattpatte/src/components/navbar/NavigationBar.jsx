import React, {useState, useEffect, useContext} from "react";
import './NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import axios from "axios"
import { LoginContext } from "../context/ContextProvider";

export default function NavigationBar() {
    const [userData, setUserData] = useState({});
    const {account, setAccount} = useContext(LoginContext)
    // console.log("userData response", userData)
    // console.log("navbar account: ", account)
    
    const getUser = async()=>{
        try{
            const response = await axios.get("http://localhost:6005/login/success/", {withCredentials:true})
            console.log("response", response)
            setUserData(response.data.user);
        } catch (error){
            console.log("error", error)
        }
    }

    const getValidUser = async() => {
        const res = await fetch("/validUser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if(res.status !== 201){
            console.log("getValidUser error")
        } else {
            //console.log("getValidUser", data)
            setAccount(data)
        }
    }

    useEffect(()=>{
        getUser()
        getValidUser()
    },[])

    const logout = () => {
        window.open("http://localhost:6005/logout", "_self")
    }
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="logo">chattpatte</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
                        <Nav.Link as={Link} to="/">Menu</Nav.Link>
                        {
                            account ? 
                            <Nav.Link as={Link} to="/cartDetails" className="NavbarCartSection">
                                <FontAwesomeIcon icon={faShoppingCart}/>
                                <span className="cartNumber">{account.carts.length}</span>
                            </Nav.Link> :
                            <Nav.Link as={Link} to="/login" className="NavbarCartSection">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <span className="cartNumber">0</span>
                        </Nav.Link>
                        }
                        {
                            account ? 
                                <>
                                    <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                                    <NavDropdown title={account.displayName[0].toUpperCase()} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/" onClick={logout}>Logout</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/">
                                            Settings
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            : 
                            <>
                                <Nav.Link as={Link} to="/login" className="greenbutton">Login / Sign Up</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

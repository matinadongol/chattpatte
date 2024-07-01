import React, {useState, useEffect, useContext} from "react";
import './NavigationBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { LoginContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";

export default function NavigationBar() {
    const [userData, setUserData] = useState({});
    const {account, setAccount} = useContext(LoginContext)
    const [text, setText] = useState("")
    const [listOpen, setListOpen] = useState(true)

    // console.log("userData response", userData)
    // console.log("navbar account: ", account)
    //console.log("search bar text: ", text)

    const {items} = useSelector(state => state.getItemsData);

    const history = useNavigate()
    
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

    const logoutUser = async() => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data2 = await res2.json()
        if(res2.status !== 201){
            console.log("logoutUser error")
        } else {
            console.log("logoutUser success", data2)
            alert("logout")
            setAccount(false)
            history("/")
        }
    }

    const getText = (items) => {
        setText(items)
        setListOpen(false)
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
                        <Form className="searchForm">
                            <div className="searchSection">
                                <Form.Control
                                type="search"
                                placeholder="Search ... 🔍"
                                className="searchInput"
                                aria-label="Search"
                                onChange={(e)=>getText(e.target.value)}
                                />
                            </div>
                            <div className="searchListSection">
                                {
                                    text &&
                                    <ListGroup hidden={listOpen} className="searchListGroup">
                                        {
                                            items.filter(item => item.itemName.toLowerCase().includes(text.toLowerCase())).map(items=>(
                                                <Nav.Link className="searchListNavLink" as={Link} to={`/getItemsByID/${items.id}`} onClick={()=>setListOpen(true)}>
                                                    <ListGroup.Item>
                                                        {items.itemName}
                                                    </ListGroup.Item>
                                                </Nav.Link>
                                            ))
                                        }
                                    </ListGroup>
                                }
                            </div>
                        </Form>
                        {
                            account && account.carts.length ? 
                            <Nav.Link as={Link} to="/cartDetails" className="NavbarCartSection">
                                <FontAwesomeIcon icon={faShoppingCart}/>
                                <span className="cartNumber">{account.carts.length}</span>
                            </Nav.Link> :
                            <Nav.Link as={Link} to="/login" className="NavbarCartSection">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                        </Nav.Link>
                        }
                        {
                            account ? 
                                <>
                                    <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                                    <NavDropdown title={account.displayName[0].toUpperCase()} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/" onClick={logoutUser}>Logout</NavDropdown.Item>
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

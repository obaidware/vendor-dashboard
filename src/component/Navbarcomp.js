import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'
import { Context } from '../context';
import '../App.css'

export default function Navbarcomp() {

    const { state, dispatch } = useContext(Context);
    console.log(state)
    return (
        <Navbar className="shadow p-3 mb-5 bg-body rounded" fixed='top' style={{
            postion: 'sticky',
            top: 0,
            backgroundColor: "red",
        }} >
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/" style={{ textDecorationLine: 'none', color: 'black' }}>
                        Welcome, {state.user.name}
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link  class="nav-links">
                            <Link to={'/'} style={{ textDecorationLine: 'none', color: 'black' }}>
                                Home
                            </Link>
                        </Nav.Link>

                        {/* <Nav.Link  class="nav-links">
                            <Link to={'/customers'} style={{ textDecorationLine: 'none', color: 'black' }}  >
                                Customers
                            </Link>
                        </Nav.Link> */}
                        
                        <Nav.Link  class="nav-links">
                            <Link to={'/venues'} style={{ textDecorationLine: 'none', color: 'black' }}  >
                                Venues
                            </Link>
                        </Nav.Link>
                        
                        <Nav.Link  class="nav-links">
                            <Link to={'/addVenue'} style={{ textDecorationLine: 'none', color: 'black' }}  >
                                Add Venue
                            </Link>
                        </Nav.Link>

                    </Nav>

                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Button
                                onClick={() => {
                                    dispatch({ type: "SET_AUTH", loggedInUser: false })
                                }}
                                variant="primary">LogOut</Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import NavItem from 'react-bootstrap/lib/NavItem'

export default function Header (){
    return(
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">JobUp</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/dashboard">
                        <NavItem>Dashboard</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/history">
                        <NavItem>History</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        </div>
    )
}







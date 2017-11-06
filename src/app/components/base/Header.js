/**
 * Created by uroszivaljevic on 9/30/17.
 */

import React from "react";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default class Header extends React.Component {

    render() {
        return (
            <Navbar inverse fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Retriever League</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/dogs">
                        <NavItem>Dogs</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contests">
                        <NavItem>Contests</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/contests/3">
                        <NavItem>Tests</NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>
        )
    }

}
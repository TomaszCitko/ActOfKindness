import React from 'react';
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import logo from "../../images/handshake.png"

function Navbar() {
    return (
        <Menu  inverted fixed={'top'}>
            <Menu.Item as={NavLink} to={'/'}>
                <img src={logo} alt="logo" width={50}/>Act Of Kindness
            </Menu.Item >
            <Menu.Item as={NavLink} to={"/events"}>Events</Menu.Item>
            <Menu.Item as={NavLink} to={"/createEvent"}>Create Event</Menu.Item>
        </Menu>
    );
}

export default Navbar;
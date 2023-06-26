import React from 'react';
import {Header, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import logo from "../../images/handshake.png"
import {store, useStore} from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import {observer} from "mobx-react-lite";

function Navbar() {
    const {accountStore} = useStore()

    return (
        <Menu inverted fixed={'top'}>
            <Menu.Item as={NavLink} to={'/'}>
                <img src={logo} alt="logo" width={50}/>Act Of Kindness
            </Menu.Item >
            <Menu.Item as={NavLink} to={"/events"}>Events</Menu.Item>
            <Menu.Item as={NavLink} to={"/createEvent"}>Create Event</Menu.Item>
            <Menu.Item onClick={()=>store.modalStore.openModal(<LoginForm/>, "Login to help others")} position={'right'}> {accountStore.isLoggedIn ? (
                `Welcome ${accountStore.user?.username}`
            ):"Login"} </Menu.Item>

            <Menu.Item onClick={()=>store.modalStore.openModal(<LoginForm/>, "Register")} position={'right'}> Register </Menu.Item>

            <Menu.Item onClick={accountStore.logout} position={'right'}>
                {accountStore.isLoggedIn ? "Logout" : ""}</Menu.Item>
        </Menu>
    );
}

export default observer(Navbar);
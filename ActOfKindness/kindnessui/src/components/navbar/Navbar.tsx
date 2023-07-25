import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, Header, Image, Menu} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import logo from "../../images/handshake.png"
import {store, useStore} from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import {observer} from "mobx-react-lite";
import RegisterForm from "../users/RegisterForm";

function Navbar() {
    const {accountStore} = useStore()

    return (
        <Menu inverted fixed={'top'}>
            <Menu.Item as={NavLink} to={'/'}>
                <img src={logo} alt="logo" width={50}/>Act Of Kindness
            </Menu.Item >
            <Menu.Item as={NavLink} to={"/events"}>Events</Menu.Item>

            <Menu.Item
                onClick={() => {
                    if (accountStore.isLoggedIn) {
                        window.location.href = "/createEvent";
                    } else {
                        store.modalStore.openModal(<LoginForm/>, "Login to create event");
                    }
                }}
            >
                Create Event
            </Menu.Item>
            
            {accountStore.isLoggedIn && (accountStore.user?.role === 'Admin' || accountStore.user?.role === 'Moderator') && (
                <Menu.Item as={NavLink} to={"/unmoderatedEvents"}>Unmoderated</Menu.Item>
            )}

            {accountStore.isLoggedIn ? (
                <Menu.Item className={'navDropdown'} position={"right"}>
                    <Image src={accountStore.user?.mainPhotoUrl} avatar />
                    <Dropdown className={'navDropdown'} pointing='top left' text={accountStore.user?.username}>
                        <DropdownMenu style={{right: 0, left: 'auto'}} className={'navDropdown'}>
                            <DropdownItem as={Link} to={`/profile/${accountStore.user?.username}`} text='My profile' />
                            <DropdownItem onClick={accountStore.logout} text='Logout' icon='power' />
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>

            ): <>
                <Menu.Item  onClick={()=>store.modalStore.openModal(<LoginForm/>, "Login to help others")} > {accountStore.isLoggedIn ? (
                    `Welcome ${accountStore.user?.username}`
                ):"Login"} </Menu.Item>

                <Menu.Item onClick={()=>store.modalStore.openModal(<RegisterForm/>, "Register to help others")} > {accountStore.isLoggedIn ? (
                    `Welcome ${accountStore.user?.username}`
                ):"Register"} </Menu.Item>
               </>
            }
        </Menu>
    );
}

export default observer(Navbar);
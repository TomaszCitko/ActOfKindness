import React from 'react';
import {Dropdown, DropdownItem, DropdownMenu, Header, Menu} from "semantic-ui-react";
import {Link, NavLink} from "react-router-dom";
import logo from "../../images/handshake.png"
import {store, useStore} from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import {observer} from "mobx-react-lite";
import AccountStore from "../../app/stores/accountStore";
import RegisterForm from "../users/RegisterForm";

function Navbar() {
    const {accountStore} = useStore()

    return (
        <Menu inverted fixed={'top'}>
            <Menu.Item as={NavLink} to={'/'}>
                <img src={logo} alt="logo" width={50}/>Act Of Kindness
            </Menu.Item >
            <Menu.Item as={NavLink} to={"/events"}>Events</Menu.Item>
            <Menu.Item as={NavLink} to={"/createEvent"}>Create Event</Menu.Item>
            <Menu.Item as={NavLink} to={"/unmoderatedEvents"}>Unmoderated</Menu.Item>


            {/*<Menu.Item as={NavLink} to={'/register'} position={'right'}> Register </Menu.Item>*/}

            {accountStore.isLoggedIn ? (
                <Menu.Item className={'navDropdown'} position={"right"}>
                    <Dropdown className={'navDropdown'} pointing={'top left'}
                              text={accountStore.user?.username}>
                        <DropdownMenu className={'navDropdown'} >
                            <DropdownItem  as={Link} to={`/profile/${accountStore.user?.username}`}
                                           text={'my profile'}/>
                            <DropdownItem onClick={accountStore.logout} text={'Logout'} icon={'power'}/>
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
import React from 'react';
import logo from "../../images/handshake.png";
import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import {Header} from "semantic-ui-react";

function Homepage() {
    const {accountStore} = useStore()

    return (
        <div className="App">
            <Header as={'h2'}> {accountStore.isLoggedIn ? (
                `Welcome ${accountStore.user?.username}`
            ):""}</Header>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Act-Of-Kindness</p>
                <a className="App-link"
                    href="https:/github.com/CodecoolGlobal/el-proyecte-grande-sprint-1-csharp-Tomek-Boomer">
                    Our GitHub</a>
            </header>
        </div>
    );
}

export default observer(Homepage);
import React from 'react';
import logo from "../../images/handshake.png";

function Homepage() {
    return (
        <div className="App">
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

export default Homepage;
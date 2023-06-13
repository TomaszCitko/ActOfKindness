import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {useStore} from "../stores/store";
import {Container} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
function App() {
    // const {eventStore} = useStore()

    return (
      <>
        <Navbar/>
        <Container style={{marginTop: '7em'}}>
            <Outlet/>
        </Container>
      </>
  );
}

export default observer(App);

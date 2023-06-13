import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {useStore} from "../stores/store";
import {Button, Container} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
function App() {
    const {eventStore} = useStore()

    return (
      <>
        <Navbar/>
        <Container style={{marginTop: '7em'}}>
            <Button content={'add !'} onClick={eventStore.populateUser} />
            <h2>{eventStore.users.map(user=> (
                <p key={user.id}>{user.first_name}</p>
            ))}</h2>
            <Outlet/>
        </Container>
      </>
  );
}

export default observer(App);

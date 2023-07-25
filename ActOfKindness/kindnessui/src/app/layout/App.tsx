import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {useStore} from "../stores/store";
import {Container} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import MyLoginModal from "../../components/modals/myGenericModal";
function App() {
    const {accountStore}= useStore()
    const { eventStore } = useStore();

    useEffect(() => {
        eventStore.loadEvents(1);
        if (accountStore.token){
            accountStore.getUser()
        }}
    , [accountStore]);


    return (
      <>
          <MyLoginModal/>
          <Navbar/>
          <Container style={{marginTop: '1.3em'}}>
                <Outlet/>
          </Container>
      </>
  );
}

export default observer(App);

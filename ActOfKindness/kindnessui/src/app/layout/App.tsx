import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import {useStore} from "../stores/store";
import {Container} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import MyLoginModal from "../../components/modals/myGenericModal";
import Footer from '../../components/footer/Footer';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { accountStore } = useStore()
  const { eventStore } = useStore();

  useEffect(() => {
      eventStore.loadEvents(1);
      if (accountStore.token){
          accountStore.getUser();
      }}
  , [accountStore]);

  if(accountStore.loadingUser){
    return <div></div>;
  }

    return (
      <>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
            style={{ marginTop: '55px' }}
          />  
          <MyLoginModal/>
          <Navbar/>
          <Container style={{marginTop: '1.3em'}}>
                <Outlet/>
          </Container>
          <Footer/>
      </>
  );
}

export default observer(App);

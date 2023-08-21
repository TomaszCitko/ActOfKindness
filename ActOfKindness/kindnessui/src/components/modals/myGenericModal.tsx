import React from 'react';
import {Modal, Segment} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import logo from "../../images/handshake.png";

function MyGenericModal() {
    const { modalStore} = useStore()

    return (
        <>
            <Modal
                dimmer={'blurring'}
                open={modalStore.modal.open}
                onClose={modalStore.closeModal}
                size={'mini'}
            >
                <Modal.Header  style={{textAlign:'center', color: '#d63b3b', fontSize:'1.5em'}}>
                    {modalStore.modal.header} <img src={logo} alt="logo" width={30}/>
                </Modal.Header>
                <Modal.Content>
                    {modalStore.modal.body}
                </Modal.Content>
                <Modal.Actions>
                        {modalStore.modal.footer}
                </Modal.Actions>
            </Modal>
        </>
    );
}

export default observer(MyGenericModal)
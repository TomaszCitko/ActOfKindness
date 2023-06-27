import React from 'react';
import {Modal} from "semantic-ui-react";
import {store, useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";

function MyRegisterModal() {
    const { modalStore} = useStore()

    return (
        <Modal
            dimmer={'blurring'}
            open={modalStore.modal.open}
            onClose={modalStore.closeModal}
            size={'mini'}
        >
            <Modal.Header>Register to help others;) </Modal.Header>
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    );
}

export default observer(MyRegisterModal)
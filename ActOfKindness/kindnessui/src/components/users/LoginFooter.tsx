import React from 'react';
import { store } from '../../app/stores/store';
import RegisterForm from './RegisterForm';
import RegisterFooter from './RegisterFooter';

function LoginFooter() {
    const handleRegisterClick = () => {
        store.modalStore.closeModal();
        store.modalStore.openModal(
            <RegisterForm/>,
            "Register to help others",
            <RegisterFooter/>
        );
    }

    return (
        <div>Don't have an account yet? <a onClick={handleRegisterClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#525252' }}>Register</a> <span>&rarr;</span></div>
    )
}

export default LoginFooter;
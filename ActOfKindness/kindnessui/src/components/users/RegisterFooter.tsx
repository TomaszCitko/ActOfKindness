import React from 'react';
import { store } from '../../app/stores/store';
import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';

function RegisterFooter() {
    const handleLoginClick = () => {
        store.modalStore.closeModal();
        store.modalStore.openModal(
            <LoginForm/>,
            "Login to help others",
            <LoginFooter/>
        );
    }

    return (
        <>
            <div className='smallFooterText'>By continuing you agree to <u>Terms of Service</u> and <u>Privacy Policy</u></div>
            <div>Already have an account? <a onClick={handleLoginClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#525252' }}>Login</a> <span>&rarr;</span></div>
        </>    
    )
}

export default RegisterFooter;
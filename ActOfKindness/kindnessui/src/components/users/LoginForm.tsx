import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { Button, Form as SemanticUIForm, FormField, Message, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import {store, useStore} from "../../app/stores/store";

function LoginForm() {
    const { accountStore } = useStore();

    const [formError, setFormError] = useState<string | null>(null);

    useEffect(() => {
      if(accountStore.redirectToLoginModal){
        setFormError("You don't have an access to this page!");
        accountStore.setRedirectToLoginModal(false);
      }
    }, [accountStore]);

    const formik = useFormik({
        initialValues: {email: '', password:''},
        onSubmit: async (values) => {
          try {
            await accountStore.login(values);
            toast.success('Logged in successfully!');
            setFormError(null);
          } catch (error) {
            setFormError('Invalid email or password!');
          }
        },
      });

    return (
        <SemanticUIForm onSubmit={formik.handleSubmit} autoComplete={'off'} className={'ui form'}>
            {formError && <Message error content={formError} style={{display: "block", textAlign: "center"}} />}
            <FormField>
                <Input 
                    type='text'  
                    placeholder='Email' 
                    name='email' 
                    onChange={formik.handleChange} 
                    value={formik.values.email}
                />
            </FormField>
            <FormField>
                <Input 
                    type='password'  
                    placeholder='Password' 
                    name='password' 
                    onChange={formik.handleChange} 
                    value={formik.values.password}
                />
            </FormField>

            <Button fluid type='submit' content='Login' color='orange'/>
            <Button onClick={store.modalStore.closeModal} fluid content='Cancel' negative />
        </SemanticUIForm>
    );
}

export default LoginForm;
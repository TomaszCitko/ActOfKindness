import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Form as SemanticUIForm, FormField, Label} from 'semantic-ui-react';
import {useStore} from "../../app/stores/store";
function LoginForm() {
    const {accountStore}= useStore()
    return (
        <>
            <Formik initialValues={{email: '', password:''}}
                    onSubmit={values => accountStore.login(values)}>
                {({handleSubmit})=>(
                    <Form onSubmit={handleSubmit} autoComplete={'off'} className={'ui form'}>
                        <FormField>
                            <Field type={'text'}  placeholder='email' name='email' />
                        </FormField>
                        <FormField>
                            <Field type={'Password'}  placeholder='password' name='password' />
                        </FormField>
                        <Button fluid type={'submit'} content={'Login'} positive></Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;
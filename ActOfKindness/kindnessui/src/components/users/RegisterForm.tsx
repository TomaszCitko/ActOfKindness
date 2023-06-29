import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Form as SemanticUIForm, FormField, Header, Label, Message} from 'semantic-ui-react';
import {useStore} from "../../app/stores/store";
import * as Yup from 'yup'
import {observer} from "mobx-react-lite";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Link} from "react-router-dom";
function RegisterForm() {
    const {accountStore}= useStore()

    const validationForm = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required("Please enter stronger password").matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,40}$/,
            'Stronger password please'),
        location: Yup.string().required(),
        username: Yup.string().required(),
    })

    return (
        <>
            <Formik
                validationSchema={validationForm}
                initialValues={{email: '', password:'', username: '', location: '',error: null}}
                    onSubmit={(values, {setErrors}) => accountStore.register(values).catch(error=> setErrors({error}))}
                    enableReinitialize
                validateOnChange={false}
                validateOnBlur={true}
                    >
                {({handleSubmit, isSubmitting,isValid,dirty,touched,errors})=>(
                    <Form onSubmit={handleSubmit} autoComplete={'off'} className={'ui form error'}>
                        <Header style={{color: 'red'}} textAlign={'center'} as={'h2'} content={'Sign Up Form'}/>
                        <FormField>
                            <Field  placeholder='email' name='email' />
                            <ErrorMessage name={'email'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <Field type={'password'}  placeholder='password' name='password' />
                            <ErrorMessage name={'password'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <Field  placeholder='username' name='username' />
                            <ErrorMessage name={'username'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <Field  placeholder='location' name='location' />
                            <ErrorMessage name={'location'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        {/*<ErrorMessage name={'error'} render={()=>*/}
                        {/*    <Label>{errors.error}</Label>*/}
                        {/*}/>*/}

                        <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} fluid type={'submit'} content={'Register'} positive></Button>

                        <Button as={Link} to={'/'} loading={isSubmitting} fluid  content={'Cancel'} negative></Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default observer(RegisterForm)
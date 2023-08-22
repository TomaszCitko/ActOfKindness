import React, { useState } from 'react';
import { useFormik } from "formik";
import { Button, Form as SemanticUIForm, FormField, Message, Input, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {store, useStore} from "../../app/stores/store";

function RegisterForm() {
    const {accountStore}= useStore()

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email is a required field'),
        password: Yup.string()
            .required('Password is a required field')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,40}$/,
                'Password must contain at least one uppercase and lowercase letter, one number, one special character, and be between 7 and 40 characters long'
            ),
        username: Yup.string()
            .required('Username is a required field')
            .max(30, 'Username cannot be longer than 30 characters')
            .matches(
                /^[A-Za-z0-9@+._-]+$/,
                'Username can only consist of uppercase and lowercase letters, numbers, and the characters @ + . _ -'
            ),
        nickname: Yup.string()
            .required('Display Name is a required field')
            .max(30, 'Display Name cannot be longer than 30 characters')
            .matches(
                /\S/,
                'Display Name cannot consist of only whitespace characters'
            ),
    });    

    const [formError, setFormError] = useState<string | null>(null);

    function isAxiosError(error: any): error is { response: { data: { errors: Record<string, string[]> } } } {
        return !!error.response && !!error.response.data && !!error.response.data.errors;
    }

    const formik = useFormik({
        initialValues: {email: '', password:'', username: '', nickname: ''},
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await accountStore.register(values);
                toast.success('Registration successful! Welcome to Act Of Kindness!');
                setFormError(null);
            } catch (error) {
                if (isAxiosError(error)) {
                    const errorMessages = Object.values(error.response.data.errors)
                        .map(fieldErrors => fieldErrors.join(' '))
                        .join('\n');
                    setFormError(errorMessages);
                } else {
                    setFormError('An unexpected error occurred');
                }
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
                {formik.touched.email && formik.errors.email ? <Label basic color={'red'} content={formik.errors.email}/> : null}
            </FormField>

            <FormField>
                <Input 
                    type='password'  
                    placeholder='Password' 
                    name='password' 
                    onChange={formik.handleChange} 
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <Label basic color={'red'} content={formik.errors.password}/> : null}    
            </FormField>

            <FormField>
                <Input 
                    type='text'  
                    placeholder='Username' 
                    name='username' 
                    onChange={formik.handleChange} 
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? <Label basic color={'red'} content={formik.errors.username}/> : null}    
            </FormField>

            <FormField>
                <Input 
                    type='text'  
                    placeholder='Display Name' 
                    name='nickname' 
                    onChange={formik.handleChange} 
                    value={formik.values.nickname}
                />
                {formik.touched.nickname && formik.errors.nickname ? <Label basic color={'red'} content={formik.errors.nickname}/> : null}    
            </FormField>

            <Button fluid type='submit' content='Register' color='teal' />
            <Button onClick={store.modalStore.closeModal} fluid  content='Cancel' negative />
        </SemanticUIForm>
    );
}

export default RegisterForm;
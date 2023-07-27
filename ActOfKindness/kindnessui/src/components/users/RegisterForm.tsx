import React, { useState } from 'react';
import { useFormik } from "formik";
import { Button, Form as SemanticUIForm, FormField, Message, Input, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {store, useStore} from "../../app/stores/store";

function RegisterForm() {
    const {accountStore}= useStore()

    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required().matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,40}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and be between 7 and 40 characters long'),
        location: Yup.string().required(),
        username: Yup.string().required(),
    });

    const [formError, setFormError] = useState<string | null>(null);

    function isAxiosError(error: any): error is { response: { data: { errors: Record<string, string[]> } } } {
        return !!error.response && !!error.response.data && !!error.response.data.errors;
    }

    const formik = useFormik({
        initialValues: {email: '', password:'', username: '', location: ''},
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
                    placeholder='email' 
                    name='email' 
                    onChange={formik.handleChange} 
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <Label basic color={'red'} content={formik.errors.email}/> : null}
            </FormField>

            <FormField>
                <Input 
                    type='password'  
                    placeholder='password' 
                    name='password' 
                    onChange={formik.handleChange} 
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? <Label basic color={'red'} content={formik.errors.password}/> : null}    
            </FormField>

            <FormField>
                <Input 
                    type='text'  
                    placeholder='username' 
                    name='username' 
                    onChange={formik.handleChange} 
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? <Label basic color={'red'} content={formik.errors.username}/> : null}    
            </FormField>

            <FormField>
                <Input 
                    type='text'  
                    placeholder='location' 
                    name='location' 
                    onChange={formik.handleChange} 
                    value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? <Label basic color={'red'} content={formik.errors.location}/> : null}    
            </FormField>

            <Button fluid type='submit' content='Register' positive />
            <Button onClick={store.modalStore.closeModal} fluid  content='Cancel' negative />
        </SemanticUIForm>
    );
}

export default RegisterForm;
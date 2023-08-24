import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, FormField, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../../images/handshake.png';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

function ProfileBio() {
    const { profileStore } = useStore();

    const initialValues = {
        bio: '',
        location: '',
        nickname: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                await profileStore.updateProfile(values);
            }}
        >
            {({ handleSubmit }) => (
                <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                    <FormField>
                        <Field placeholder='Change your display name' name='nickname' />
                    </FormField>
                    <FormField>
                        <Field placeholder='Enter your city' name='location' />
                    </FormField>
                    <FormField>
                        <Field as={'textarea'} placeholder='Tell us something about yourself' name='bio' />
                    </FormField>
                    <Button floated={'right'} color={'orange'} type={'submit'} content={'Submit'} />
                </Form>
            )}
        </Formik>
    );
}

export default observer(ProfileBio)

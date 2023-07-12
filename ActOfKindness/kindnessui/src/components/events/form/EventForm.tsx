import React from 'react';
import {Segment, Button, FormField, Label} from "semantic-ui-react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup"
import logo from "../../../images/handshake.png";
import {useStore} from "../../../app/stores/store";
import { isAfter, isEqual, parse, isValid } from 'date-fns';

function EventForm() {
    const {eventStore} = useStore()

    const initialValues = {
        id: '',
        userId: '',
        localization: '',
        isOnline:true,
        title:	'',
        description: '',
        startingDate: '',
        endingDate: '',
        type: 0,
        image: '',
    }

    const formValidation = Yup.object({
        title: Yup.string().required('Title is required Sir'),
        description: Yup.string().required('Please tell something'),
        localization: Yup.string().required('We need to know where help is needed!'),
        startingDate: Yup.string().required('Date is required').test('is-future-date', 'Date must not be in the past', function (value) {
            const inputDate = parse(value, "dd/MM/yyyy", new Date());
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (!isValid(inputDate)) {
                return this.createError({
                    message: "Invalid date format. Use dd/MM/yyyy.",
                    path: this.path,
                });
            }
            return isAfter(inputDate, currentDate) || isEqual(inputDate, currentDate);
        }),
        endingDate: Yup.string().required('Date is required').test('is-future-date', 'Ending date cannot be before starting date', function (value) {
            const startDate = parse(this.parent.startingDate, "dd/MM/yyyy", new Date());
            const endDate = parse(value, "dd/MM/yyyy", new Date());
            if (!isValid(endDate)) {
                return this.createError({
                    message: "Invalid date format. Use dd/MM/yyyy.",
                    path: this.path,
                });
            }
            return isAfter(endDate, startDate) || isEqual(endDate, startDate);
        })
    })


    return (
        <Segment inverted  clearing raised style={{marginTop: 100}}>
            <Label style={{marginBottom: 15}} as='a' color='orange' ribbon>
                Thank you for trying to help
            </Label>

            <Formik
                validationSchema={formValidation}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={values => {eventStore.createEvent(values)}}>
                {({handleSubmit, isValid, isSubmitting,dirty })=>(
                    <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                        <FormField >
                            <Field as={"select"} defaultValue={'defaultValue'} name='type'>
                                <option className={"optionPlaceholder"} value="defaultValue" disabled>Event Type</option>
                                <option value="0">I need help!</option>
                                <option value="1">I want to help someone!</option>
                            </Field>
                        </FormField>

                        <FormField>
                            <Field  placeholder='Title' name='title' />
                            <ErrorMessage name={'title'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField >
                            <Field placeholder='City' name='localization'  />
                            <ErrorMessage name={'localization'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <Field name="startingDate" placeholder="Starting Date   dd/mm/yyyy" />
                            <ErrorMessage name={'startingDate'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <Field name="endingDate" placeholder="Ending Date    dd/mm/yyyy" />
                            <ErrorMessage name={'endingDate'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <Field as={"textarea"}  placeholder='Description' name='description' />
                            <ErrorMessage name={'description'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <Button
                            // disabled={isSubmitting || !isValid || !dirty}
                            floated={"right"} color={"orange"} type={"submit"} content={'Submit'}></Button>
                        <Button as={Link} to={'/events'} floated={'right'}  type={'button'} content={'Cancel'}></Button>
                    </Form>
                )}

            </Formik>
            <Label as={Link} to={'/'} style={{background: 'Transparent'}}>
                <img alt={"heart-handshake-logo"} src={logo} />
            </Label>
        </Segment>
    );
}

export default EventForm;
import React, {useState} from 'react';
import {Segment, Button, FormField, Label} from "semantic-ui-react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Link, NavLink} from "react-router-dom";
import * as Yup from "yup"
import logo from "../../../images/handshake.png";
import {MyEvent} from "../../../app/models/myEvent";
import {v4 as uuid} from "uuid";
import {MyEventCreate} from "../../../app/models/myEventCreate";

function EventForm() {
    const [myEventCreate, setMyEvent] = useState({
        id: '',
        userId: '',
        localization: '',
        isOnline:'',
        title:	'',
        description: '',
        starting_Date: '',
        ending_Date: '',
        latitude: '',
        longitude: '',
        type: '',
        image: '',
    })

    const formValidation = Yup.object({
        title: Yup.string().required('Title is required Sir'),
        description: Yup.string().required('Please tell something'),
        localization: Yup.string().required('We need to know where help is needed!'),
        starting_Date: Yup.string().matches(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            'Invalid date format. Use dd/mm/yyyy.'
        ).test('is-future-date', 'Date must not be in the past', function (value) {
            if (!value) {
                return this.createError({
                    message: "Date is required",
                    path: this.path,
                });
            }
            const currentDate = new Date();
            const [day, month, year] = value.split('/').map(Number);
            const inputDate = new Date(year, month - 1, day);
            return inputDate >= currentDate;
        }),
        ending_Date: Yup.string().matches(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            'Invalid date format. Use dd/mm/yyyy.'
        ).test('is-future-date', 'Ending date cannot be before starting date', function (value) {
            if (!value) {
                return this.createError({
                    message: "Date is required",
                    path: this.path,
                });
            }
            const startDate = new Date(this.parent.starting_Date);
            const [day, month, year] = value.split('/').map(Number);
            const endDate = new Date(year, month, day);
            console.log(endDate, startDate)
            return endDate >= startDate;
        })
    })

    const handleFormSubmit = (event: MyEventCreate)=>{
        if (event.id.length === 0){
            event.id = uuid()
        }
        console.log(event)
    }

    return (
        <Segment inverted  clearing raised >
            <Label style={{marginBottom: 15}} as='a' color='orange' ribbon>
                Thank you for trying to help
            </Label>

            <Formik
                validationSchema={formValidation}
                initialValues={myEventCreate}
                enableReinitialize
                onSubmit={values=> handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting,dirty })=>(
                    <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                        <FormField >
                            <Field as={"select"} defaultValue={'defaultValue'} name='type'>
                                <option className={"optionPlaceholder"} value="defaultValue" disabled>Event Type</option>
                                <option value="HelpNeeded">I need help</option>
                                <option value="HelpOffer">I want to help someone!</option>
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
                            <Field name="starting_Date" placeholder="Starting Date dd/mm/yyyy" />
                            <ErrorMessage name={'starting_Date'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>


                        <FormField>
                            <Field name="ending_Date" placeholder="Ending Datedd/mm/yyyy" />
                            <ErrorMessage name={'ending_Date'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>



                        <FormField>
                            <Field as={"textarea"}  placeholder='Description' name='description' />
                            <ErrorMessage name={'description'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <Button
                            disabled={isSubmitting || !isValid || !dirty}
                            floated={"right"} color={"orange"} type={"submit"} content={'submit'}></Button>
                        <Button as={Link} to={'/events'} floated={'right'}  type={'button'} content={'Cancel'}></Button>
                    </Form>
                )}

            </Formik>
            <Label as={NavLink} to={'/'} style={{background: 'Transparent'}}>
                <img alt={"heart-handshake-logo"} src={logo} />
            </Label>
        </Segment>
    );
}

export default EventForm;
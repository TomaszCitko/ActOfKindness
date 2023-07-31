import React, { useEffect, useState } from 'react';
import { Segment, Button, FormField, Label, Checkbox, CheckboxProps } from "semantic-ui-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useParams, useLocation } from "react-router-dom";
import * as Yup from "yup"
import logo from "../../../images/handshake.png";
import {useStore} from "../../../app/stores/store";
import { isAfter, isEqual, parse, isValid, format } from 'date-fns';
import PhotoUploadWidget from "../../../app/common/PhotoUploadWidget";
import {observer} from "mobx-react-lite";
import MyDateInput from "../../../app/common/MyDateInput";

function EventForm() {
    const {eventStore} = useStore();
    const { id: eventId } = useParams();
    const location = useLocation();
    const {profileStore : {
        uploadPhoto,uploading,loading,setMainPhoto
    }} = useStore();

    const [initialValues, setInitialValues] = useState({

        id: '',
        userId: '',
        localization: '',
        isOnline: false,
        title:	'',
        description: '',
        startingDate: '',
        endingDate: '',
        type: 0,
        image: '',
    });

    useEffect(() => {
        eventStore.loading = false;

        const loadEventDetails = async () => {
            if(eventId){
                const eventDetails = await eventStore.loadEventDetails(eventId);
                if (eventDetails) {
                    const formattedStartDate = format(new Date(eventDetails.startingDate), "dd/MM/yyyy");
                    const formattedEndDate = format(new Date(eventDetails.endingDate), "dd/MM/yyyy");

                    setInitialValues({
                        id: eventDetails.id,
                        userId: eventDetails.userId,
                        localization: eventDetails.localization,
                        isOnline: eventDetails.isOnline,
                        title: eventDetails.title,
                        description: eventDetails.description,
                        startingDate: formattedStartDate,
                        endingDate: formattedEndDate,
                        type: eventDetails.type,
                        image: eventDetails.image,
                    });
                }
            }
        };
        loadEventDetails();
    }, [eventId, eventStore]);

    useEffect(() => {
        if(location.pathname === "/createEvent") {
          setInitialValues({
            id: '',
            userId: '',
            localization: '',
            isOnline: false,
            title:  '',
            description: '',
            startingDate: '',
            endingDate: '',
            type: 0,
            image: '',
          });
        }
    }, [location]);
    
    useEffect(() => {
        eventStore.success = false
        return () => {
            eventStore.success = false

        };
    }, []);

    const [disableLocation, setDisableLocation] = useState(initialValues.isOnline);

    useEffect(() => {
        setDisableLocation(initialValues.isOnline);
    }, [initialValues.isOnline]);

    const handleIsOnlineChange = (setFieldValue) => (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        const { checked } = data;
        if (checked === undefined) {
            return;
        }
    
        setFieldValue('isOnline', checked);
        setDisableLocation(checked);
        if (checked) {
            setFieldValue('localization', 'Online');
        } else {
            setFieldValue('localization', '');
        }
    };


    const [photoUrl,setPhotoUrl]=useState('')
    async function  handleUploadPhoto(file: Blob) {
        const url = await eventStore.uploadPhotoForCreateEvent(file)
        console.log(url)
        if (url) setPhotoUrl(url)
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
        <Segment inverted  clearing raised style={{marginTop: 100,marginBottom:100}}>
            <Label style={{marginBottom: 15}} as='a' color='orange' ribbon>
                Thank you for trying to help
            </Label>

            <Formik
                // validationSchema={formValidation}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={async (values) => {
                    values.type = Number(values.type);
                    values.isOnline = Boolean(values.isOnline);
                    if (eventId) {
                        if (photoUrl) values.image = photoUrl
                        await eventStore.updateEvent(values);
                    } else {
                        if (photoUrl) values.image = photoUrl
                        await eventStore.createEvent(values);
                    }
                }}>
                {({handleSubmit, isValid, isSubmitting, dirty, setFieldValue })=>(
                    <Form className={'ui form'} onSubmit={handleSubmit} autoComplete={'off'}>
                        <FormField>
                            <Field as={"select"} defaultValue={"defaultValue"} name="type" disabled={!!eventId}>
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

                        <FormField>
                            <Checkbox
                                label="Is Online"
                                name="isOnline"
                                checked={disableLocation}
                                onChange={handleIsOnlineChange(setFieldValue)}
                            />
                        </FormField>

                        <FormField >
                        <Field placeholder='City' name='localization'  disabled={disableLocation} />
                            <ErrorMessage name={'localization'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                            <MyDateInput placeholderText={'Starting Date'}
                                         name="startingDate"
                                        //  showTimeSelect
                                        //  timeCaption={'time'}
                            />

                            <MyDateInput placeholderText={'Ending Date'}
                                         name="endingDate"
                                        //  showTimeSelect
                                        //  timeCaption={'time'}
                            />

                        {/*<FormField>*/}
                        {/*    <Field name="endingDate" placeholder="Ending Date    dd/mm/yyyy" />*/}
                        {/*    <ErrorMessage name={'endingDate'} render={error=>*/}
                        {/*        <Label basic color={'red'} content={error}/>}/>*/}
                        {/*</FormField>*/}

                        <FormField>
                            <Field as={"textarea"}  placeholder='Description' name='description' />
                            <ErrorMessage name={'description'} render={error=>
                                <Label basic color={'red'} content={error}/>}/>
                        </FormField>

                        <FormField>
                            <PhotoUploadWidget uploadPhoto={handleUploadPhoto} loading={eventStore.uploading} isCreateEvent={true} />
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

export default observer(EventForm)
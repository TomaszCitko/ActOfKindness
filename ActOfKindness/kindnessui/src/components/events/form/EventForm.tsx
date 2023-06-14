import React, {useState} from 'react';
import {Segment, Form, Button} from "semantic-ui-react";
import {Formik} from "formik";
import {Simulate} from "react-dom/test-utils";
import {Link} from "react-router-dom";

function EventForm() {
    const [myEvent, setMyEvent] = useState({
        id: '',
        title: '',
        description: '',
        localization: '',

    })
    return (
        <Segment inverted  clearing >
            <Formik
                initialValues={myEvent}
                enableReinitialize
                onSubmit={values=> console.log(values)}>
                {({values: myEvent, handleChange, handleSubmit})=>(
                    <Form inverted onSubmit={handleSubmit} autoComplete={'off'}>

                        <Form.Input  placeholder='Title' value={myEvent.title} name='title' onChange={handleChange} />
                        <Form.TextArea rows={3} placeholder='Description' value={myEvent.description} name='description' onChange={handleChange} />
                        <Form.Input placeholder='Localization' value={myEvent.localization} name='localization' onChange={handleChange}/>

                        <Button floated={"right"} color={"orange"} type={"submit"} content={'submit'}></Button>

                        <Button as={Link} to={'/events'} floated={'right'}  type={'button'} content={'Cancel'}></Button>
                    </Form>
                )}


            </Formik>
        </Segment>
    );
}

export default EventForm;
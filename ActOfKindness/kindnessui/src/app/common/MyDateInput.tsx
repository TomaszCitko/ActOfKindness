import React from "react";
import {useField} from "formik";
import DatePicker,{ReactDatePickerProps} from "react-datepicker";
import {Form, Label} from "semantic-ui-react";



export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field,meta,helpers] = useField(props.name!);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(date) => {

                    helpers.setValue(date);
                    console.log(date)
                }}
            />
        </Form.Field>

    );
};
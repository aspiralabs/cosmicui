// Generated with util/create-component.js
import React from 'react';
import Button from '../Button';
import Input from '../Input';
import Form from './Form';

import * as yup from 'yup';
import Select from '../Select';
import TextArea from '../TextArea';
import DatePicker from '../DatePicker';

export default {
    title: 'Form'
};

export const BasicForm = () => {
    const handler = (values: any) => {
        console.log('submitted', values);
    };

    const formSchema = yup.object().shape({
        firstName: yup.string().min(3, 'Name must be three characters long').required('First Name is Required'),
        lastName: yup.string().required('Last Name is Required')
    });

    return (
        <div className="flex flex-col gap-4">
            <Form onSubmit={handler} className="flex flex-col gap-4 w-96">
                <Input name="firstName" placeholder="John Doe" />
                <DatePicker name="myDate" native />
                <DatePicker name="myDate2" />
                <Button variant="ghost" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

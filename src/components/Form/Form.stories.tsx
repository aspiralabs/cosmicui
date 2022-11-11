// Generated with util/create-component.js
import React from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Input from '../Input';
import Form from './Form';

import * as yup from 'yup';
import Select from '../Select';
import TextArea from '../TextArea';

export default {
    title: 'Form',
};

export const BasicForm = () => {
    const handler = (values: any) => {
        console.log('submitted', values);
    };

    const formSchema = yup.object().shape({
        firstName: yup.string().min(3, 'Name must be three characters long').required('First Name is Required'),
        lastName: yup.string().required('Last Name is Required'),
    });

    return (
        <div className="flex flex-col gap-4">
            <Form onSubmit={handler} className="flex flex-col gap-4 w-96">
                <Input name="firstName" placeholder="John Doe" />
                <Select
                    placeholder="John Doe"
                    name="selectName"
                    searchable
                    options={[
                        { label: 'Bob', value: 'bob' },
                        { label: 'Jimmy', value: 'jimmy' },
                        { label: 'Kim', value: 'kim' },
                    ]}
                />

                <Input name="lastName" placeholder="Last Name" />
                <TextArea name="message" placeholder="Enter your Message" minHeight={100} />

                <Button variant="ghost" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

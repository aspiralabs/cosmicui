// Generated with util/create-component.js
import React from 'react';
import Button from '../Button';
import Input from '../Input';
import Form from './Form';

import * as yup from 'yup';
import DatePicker from '../DatePicker';
import Select from '../Select';

export default {
    title: 'Form'
};

const selectFieldValues = [
    {
        label: 'Hi',
        value: 'hi'
    },
    {
        label: 'Hii',
        value: 'hii'
    },
    {
        label: 'Hiii',
        value: 'hiii'
    },
    {
        label: 'Hiiii',
        value: 'hiiii'
    }
];

export const BasicForm = () => {
    const handler = (values: any) => {
        console.log('submitted', values);
    };

    const schema = yup.object().shape({
        password: yup.string().required()
    });

    // 2022-12-23T00:00:00.000Z

    return (
        <div className="flex flex-col gap-4 w-96">
            <Form
                onSubmit={handler}
                className="flex flex-col gap-6 w-full"
                defaultFormValues={{
                    firstName: 'David',
                    lastName: 'Ludemann',
                    selectField: 'hiii',
                    birthDay: '2022-12-23T06:00:00.000Z'
                }}
            >
                <Input label="First Name" name="firstName" />
                <Select options={selectFieldValues} label="Select" name="selectField" />
                <DatePicker label="Birth Day" name="birthDay" datetime />
                <DatePicker label="Birth Day" name="birthDayTwo" datetime stepMinute={15} />
                <Input label="Last Name" name="lastName" />

                <Button variant="primary" className="w-full">
                    Login
                </Button>
            </Form>
        </div>
    );
};

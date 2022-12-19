// Generated with util/create-component.js
import React from 'react';
import Button from '../Button';
import Input from '../Input';
import Form from './Form';

import * as yup from 'yup';
import Checkbox from '../Checkbox';
import DatePicker from '../DatePicker';
import Radio from '../Radio';
import Range from '../Range';
import Select from '../Select';
import Switch from '../Switch';
import TextArea from '../TextArea';

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
                    selectField: 'hiii',
                    birthDay: '2022-12-23T06:00:00.000Z',
                    checkboxValue: false,
                    switchValue: false,
                    textArea: 'Hello World'
                }}
            >
                <Input label="First Name" name="firstName" />
                <Select options={selectFieldValues} label="Select" name="selectField" />
                <DatePicker label="Birth Day" name="birthDay" datetime stepMinute={15} />
                <Input label="Last Name" name="lastName" />
                <Checkbox label="Checkbox" name="checkboxValue" />
                <Switch label="Switch" name="switchValue" />
                <TextArea label="Text Area" name="textArea" />

                <Range name="rangeValue" step={10} />

                <div className="flex flex-col gap-2">
                    <Radio label="Option One" name="radioOptions" data-option-value="one" />
                    <Radio label="Option Two" name="radioOptions" data-option-value="two" />
                    <Radio label="Option Three" name="radioOptions" data-option-value="three" />
                </div>
                <Button variant="primary" className="w-full">
                    Login
                </Button>
            </Form>
        </div>
    );
};

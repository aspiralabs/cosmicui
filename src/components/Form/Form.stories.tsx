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

    const schema = yup.object().shape({
        password: yup.string().required()
    });

    return (
        <div className="flex flex-col gap-4 w-96">
            <Form onSubmit={handler} validation={schema} className="flex flex-col gap-6 w-full">
                <Input label="Password" name="password" type="password" />

                <Button variant="primary" className="w-full">
                    Login
                </Button>
            </Form>
        </div>
    );
};

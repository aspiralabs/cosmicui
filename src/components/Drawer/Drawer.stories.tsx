import React, { useState } from 'react';
import Button from '../Button';
import Form from '../Form';
import Drawer from './Drawer';
import Input from '../Input';

export default {
    title: 'Drawer'
};

export const BasicDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerOpenTwo, setDrawerOpenTwo] = useState(false);

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <div className="flex gap-4">
            <Button onClick={() => setDrawerOpenTwo(true)}>Open Right</Button>

            <Drawer open={drawerOpenTwo} width={400} location="right" onClose={() => setDrawerOpenTwo(false)}>
                <section className="p-8">
                    <Form onSubmit={handleSubmit}>
                        <Input name="firstName" label="First Name" />
                        <Input name="lastName" label="Last Name" />
                    </Form>
                </section>
            </Drawer>
        </div>
    );
};

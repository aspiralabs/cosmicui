import React, { useState } from 'react';
import Button from '../Button';
import Drawer from './Drawer';

export default {
    title: 'Drawer',
};

export const BasicDrawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerOpenTwo, setDrawerOpenTwo] = useState(false);

    return (
        <div className="flex gap-4">
            <Button onClick={() => setDrawerOpen(true)}>Open Left</Button>
            <Button onClick={() => setDrawerOpenTwo(true)}>Open Right</Button>

            <Drawer open={drawerOpen} width={400} location="left">
                <Button onClick={() => setDrawerOpen(false)}>Close</Button>
            </Drawer>

            <Drawer open={drawerOpenTwo} width={400} location="right">
                <Button onClick={() => setDrawerOpenTwo(false)}>Close</Button>
            </Drawer>
        </div>
    );
};

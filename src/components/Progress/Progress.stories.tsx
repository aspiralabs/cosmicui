import React from 'react';
import Button from '../Button';
import Progress from './Progress';

export default {
    title: 'Progress'
};

export const BasicProgress = () => {
    const [value, setValue] = React.useState(25);

    const setRandomValue = () => {
        setValue(Math.floor(Math.random() * 101));
    };

    return (
        <div className="flex flex-col gap-4" style={{ width: 400 }}>
            {/* <Progress value={value} /> */}

            <progress value={50} max={100} className="progress-primary" />
            <progress value={25} max={100} className="progress-success" />
            <Button onClick={setRandomValue}>Random Value</Button>
        </div>
    );
};

import React from 'react';
import Badge from './Badge';

export default {
    title: 'Badge'
};

export const BasicBadge = () => {
    return (
        <React.Fragment>
            <div className="flex gap-4 mb-8">
                <span className="badge-primary">Hello</span>
                <span className="badge-ghost">Hello</span>
                <span className="badge-secondary">Hello</span>
                <span className="badge-success rounded-md">Hello</span>
            </div>

            <div className="flex gap-4 mb-8">
                <Badge>Hello</Badge>
                <Badge variant="ghost">Hello</Badge>
                <Badge variant="secondary">Hello</Badge>
                <Badge variant="success">Hello</Badge>
            </div>

            <div className="flex gap-4 mb-8">
                <Badge closeable>Hello</Badge>
                <Badge variant="ghost" closeable>
                    Hello
                </Badge>
                <Badge variant="secondary" closeable>
                    Hello
                </Badge>
                <Badge variant="success" closeable>
                    Hello
                </Badge>
            </div>

            <div className="flex gap-4 mb-8">
                <Badge className="rounded-md">Hello</Badge>
                <Badge variant="ghost" className="rounded-md">
                    Hello
                </Badge>
                <Badge variant="secondary" className="rounded-md">
                    Hello
                </Badge>
                <Badge variant="success" className="rounded-md">
                    Hello
                </Badge>
            </div>
        </React.Fragment>
    );
};

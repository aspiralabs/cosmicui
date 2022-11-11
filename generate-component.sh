#!/bin/sh
echo "Generating Component Boiler Plate.."

COMPONENT_NAME=$1
mkdir -p src/components/$COMPONENT_NAME
cd src/components/$COMPONENT_NAME


# ==============================================================================
# GENERATE INDEX
# ==============================================================================
cat <<EOF >> index.ts
export { default } from './$COMPONENT_NAME';
EOF

# ==============================================================================
# GENERATE COMPEONNT
# ==============================================================================
cat <<EOF >> $COMPONENT_NAME.tsx
import React from 'react'

const $COMPONENT_NAME = ({}) => {
    return <div>Hello World</div>;
}

export default $COMPONENT_NAME
EOF

# ==============================================================================
# GENERATE STORYBOOK
# ==============================================================================
cat <<EOF >> $COMPONENT_NAME.stories.tsx
import React from 'react';
import $COMPONENT_NAME from './$COMPONENT_NAME';

export default {
    title: '$COMPONENT_NAME',
};

export const Basic$COMPONENT_NAME = () => {
   

    return (
        <div className="flex gap-4">
            <$COMPONENT_NAME />
        </div>
    );
};

EOF
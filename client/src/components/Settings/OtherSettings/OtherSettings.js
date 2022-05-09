import { Box } from '@mui/system';
import React from 'react';
import GeneralSettings from '../../ChatProfile/GeneralSettings/GeneralSettings';

const OtherSettings = ({ mode }) => {
    return (
        <Box sx={{ p: 3 }}>
            <GeneralSettings mode={mode} />
        </Box>
    );
};

export default OtherSettings;
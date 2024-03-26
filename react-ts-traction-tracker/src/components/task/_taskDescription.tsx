import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { ITaskDescription } from './interfaces/ITaskDescription';

export const TaskDescription: FC<ITaskDescription> = (props): ReactElement => {
    // Deconstruct props
    const { description = 'Default Description' } = props;

    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='space-between'
            mb={4}
        >
            <Typography>
                { description }
            </Typography>
        </Box>
    )
};

TaskDescription.propTypes = {
    description: PropTypes.string,
}
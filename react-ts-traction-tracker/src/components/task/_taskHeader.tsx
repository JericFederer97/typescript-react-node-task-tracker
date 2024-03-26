import React, { FC, ReactElement } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { ITaskHeader } from './interfaces/ITaskHeader';


export const TaskHeader: FC<ITaskHeader> = (props): ReactElement => {
    // Deconstruct props
    const { title = 'Default Title', date = new Date() } = props;

    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='space-between'
            mb={4}
        >
            <Box>
                <Typography variant='h6'>
                    { title }
                </Typography>
            </Box>
            <Box>
                <Chip
                    variant='outlined'
                    label={format(date, 'PPPP')}
                />
            </Box>
        </Box>
    )
};

TaskHeader.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date)
}
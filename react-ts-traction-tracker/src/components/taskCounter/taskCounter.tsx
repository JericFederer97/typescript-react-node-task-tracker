import React, { FC, ReactElement } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { ITaskCounter } from './interfaces/ITaskCounter';
import { Status } from '../createTaskForm/enums/Status';
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
    // Deconstruct props
    const {
        status = Status.completed,
        count = 0
    } = props

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar
                sx={{
                    backgroundColor: 'transparent',
                    border: '5px solid',
                    borderColor: `${emitCorrectBorderColor(status)}`,
                    width: '96px',
                    height: '96px',
                    marginBottom: '16px',
                }}
            >
                <Typography
                    color='#ffffff'
                    variant='h4'
                >
                    { count }
                </Typography>
            </Avatar>
            <Typography
                color='#ffffff'
                variant='h5'
                fontWeight='bold'
                fontSize='20px'
            >
                { `${emitCorrectLabel(status)}` }
            </Typography>
        </Box>
    )
}

TaskCounter.propTypes = {
    count: PropTypes.number,
    status: PropTypes.oneOf([
        Status.todo,
        Status.inProgress,
        Status.completed,
    ])
}
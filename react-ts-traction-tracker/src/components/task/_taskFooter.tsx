import React, { FC, ReactElement, useState } from 'react';
import { Box, Button, Switch, FormControlLabel } from '@mui/material';
import PropTypes from 'prop-types';

import { ITaskFooter } from './interfaces/ITaskFooter';
import { Status } from '../createTaskForm/enums/Status';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
    // Deconstruct props
    const {
        id,
        status,
        onStatusChange = (e) => alert(e),
        onClick = (e) => alert(e),
    } = props;

    return (
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mt={4}
        >
            <FormControlLabel
                label='In Progress'
                control={
                    <Switch
                        color='warning'
                        onChange={(e) => onStatusChange(e, id)}
                        defaultChecked={status === Status.inProgress}
                    />
                }
            />
            <Button
                variant='contained'
                color='success'
                size='small'
                sx={{
                    color: '#ffffff'
                }}
                onClick={(e) => onClick(e, id)}
            >
                Mark Complete
            </Button>
        </Box>
    )
};

TaskFooter.propTypes = {
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired,
    status: PropTypes.string,
}
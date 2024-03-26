import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription'
import { TaskFooter } from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {
    // Descontruct props
    const {
        title = 'Default Title',
        date = new Date(),
        description = 'Default Description',
        priority = Priority.normal,
        status = Status.completed,
        onStatusChange = (e) => alert(e),
        onClick = (e) => alert(e),
    } = props

    return (
        <Box
            display='flex'
            width='100%'
            justifyContent='flex-start'
            flexDirection='column'
            mb={3}
            p={3}
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: renderPriorityBorderColor(priority),
            }}
        >
            {/* TASK HEADER */}
            <TaskHeader title={title} date={date} />
            
            {/* TASK DESCRIPTION */}
            <TaskDescription description={description} />

            {/* TASK FOOTER */}
            <TaskFooter
                onClick={onClick}
                onStatusChange={onStatusChange}
            />
        </Box>
    )
}

Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string,
}
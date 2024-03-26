import React, { FC, ReactElement } from 'react';
import { Grid, Box } from '@mui/material';
import { format } from 'date-fns';

import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';

export const TaskArea: FC = (): ReactElement => {
    return (
        <Grid item md={8} px={4}>   
            <Box>
                <h2>Status of your tasks as of { format(new Date(), 'PPPP') }</h2>
            </Box>
            <Grid
                container
                display="flex"
                justifyContent="center"
            >
                <Grid 
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    md={10}
                    xs={12}
                    mb={8}
                >
                    <TaskCounter />
                    <TaskCounter />
                    <TaskCounter />
                </Grid>
                <Grid 
                    item
                    display="flex"
                    flexDirection="column"
                    md={8}
                    xs={10}
                >
                    <Task />
                    <Task />
                    <Task />
                </Grid>
            </Grid>
        </Grid>
    )
}

import React, { FC, ReactElement } from 'react';
import { Grid, Box, Alert, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { useQuery, useMutation } from '@tanstack/react-query';

import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/iTaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';

export const TaskArea: FC = (): ReactElement => {

    // * Fetch all tasks from the DB
    const { error, isLoading, data, refetch } = useQuery(
        {
            queryKey: ['tasks'],
            queryFn: async () => {
                return await sendApiRequest<ITaskApi[]>(
                    'http://localhost:3200/tasks',
                    'GET'
                )
            }
        }
    );

    // * Update task mutation
    const updateTaskMutation = useMutation(
        {
            mutationFn: (data: IUpdateTask) => sendApiRequest(
                'http://localhost:3200/tasks',
                'PUT',
                data
            )
        }
    )

    // * Status change handler
    function onStatusChangeHandler(
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
    ) {
        updateTaskMutation.mutate({
            id,
            status: e.target.checked ? Status.inProgress : Status.todo
        })
    }

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
                    {error && (
                        <Alert severity="error">
                            An error occurred!
                        </Alert>
                    )}

                    {!error 
                        && Array.isArray(data)
                        && data.length === 0 
                        && (
                        <Alert severity="warning">
                            No tasks exist!
                        </Alert>
                    )}

                    {isLoading ? (
                        <LinearProgress />
                    ) : (
                        Array.isArray(data)
                        && data.length > 0
                        && data.map((each, index) => {
                            return each.status === Status.todo 
                                || each.status === Status.inProgress 
                                ? (<Task
                                        key={index + each.priority}
                                        id={each.id}
                                        title={each.title}
                                        date={new Date(each.date)}
                                        description={each.description}
                                        priority={each.priority}
                                        status={each.status}
                                        onStatusChange={onStatusChangeHandler}
                                    />) 
                                : (false)
                        })
                    )}
                    
                </Grid>
            </Grid>
        </Grid>
    )
}

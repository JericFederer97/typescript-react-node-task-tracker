import React, {
    FC,
    ReactElement,
    useState,
    useEffect
} from 'react';
// import { useMutation } from 'react-query';
import { useMutation } from '@tanstack/react-query';
import { 
    Box,
    Typography,
    Stack,
    LinearProgress,
    Button,
    Alert,
    AlertTitle,
} from '@mui/material';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';

export const CreateTaskForm: FC = (): ReactElement => {
    // * States
    const [title, setTitle] = useState<string | undefined>(
        undefined,
    );

    const [description, setDescription] = useState<string | undefined>(
        undefined,
    );

    const [date, setDate] = useState<Date | null>(
        new Date(),
    );

    const [status, setStatus] = useState<string>(
        Status.todo,
    );

    const [priority, setPriority] = useState<string>(
        Priority.normal,
    );

    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // * Create task mutation
    // const createTaskMutation = useMutation(
    //     (data: ICreateTask) => sendApiRequest(
    //         'http://localhost:3200/tasks',
    //         'POST',
    //         data
    //     )
    // );

    const createTaskMutation = useMutation({
        mutationFn: (data: ICreateTask) => sendApiRequest(
                'http://localhost:3200/tasks',
                'POST',
                data
            )
      })

    function createTaskHandler() {
        if (!title || !description || !date) {
            return;
        }

        const task: ICreateTask = {
            title, // * Also means title: title
            description,
            date: date.toString(),
            status,
            priority
        }

        createTaskMutation.mutate(task);
    }

    // * Side effects
    useEffect(() => {
        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);
        }

        // * Set the success message to disappear after 9 seconds
        const successTimeOut = setTimeout(() => {
            setShowSuccess(false);
        }, 9000);

        // * Stops the setTimeout from triggering every 9 seconds
        return () => {
            clearTimeout(successTimeOut);
        }

    }, [createTaskMutation.isSuccess]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >

            {/* Alert will only be displayed if showSuccess is true */}
            {showSuccess && (
                <Alert
                    severity='success'
                    sx={{ width: '100%', marginBottom: '16px' }}
                >
                    <AlertTitle>Success</AlertTitle>
                    Task has been created!
                </Alert>
            )}

            <Typography
                mb={2}
                component="h2"
                variant="h6"
            >
                Create a Task
            </Typography>

            <Stack sx={{ width: '100%' }} spacing={2}>
                {/* Task Title */}
                <TaskTitleField
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={createTaskMutation.isPending}
                />

                {/* Task Description */}
                <TaskDescriptionField
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createTaskMutation.isPending}
                />

                {/* Task Date */}
                <TaskDateField
                    value={date}
                    onChange={(date) => setDate(date)}
                    disabled={createTaskMutation.isPending}
                />

                {/* Task Status */}
                {/* Task Priority */}
                <Stack
                    direction="row"
                    sx={{ width: '100%' }}
                    spacing={2}
                >
                    <TaskSelectField
                        label="Status"
                        name="status"
                        items={[
                            {
                                value: Status.todo,
                                label: Status.todo.toUpperCase(),
                            },
                            {
                                value: Status.inProgress,
                                label: Status.inProgress.toUpperCase(),
                            },
                        ]}
                        value={status}
                        onChange={(e) => setStatus(e.target.value as string)}
                        disabled={createTaskMutation.isPending}
                    />
                    <TaskSelectField
                        label="Priority"
                        name="priority"
                        items={[
                            {
                                value: Priority.low,
                                label: Priority.low,
                            },
                            {
                                value: Priority.normal,
                                label: Priority.normal,
                            },
                            {
                                value: Priority.high,
                                label: Priority.high,
                            },
                        ]}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as string)}
                        disabled={createTaskMutation.isPending}
                    />
                </Stack>

                {/* Shows a loading bar while data is being sent to DB */}
                {createTaskMutation.isPending && <LinearProgress />}

                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority ||
                        createTaskMutation.isPending
                    }
                    onClick={createTaskHandler}
                    variant='contained'
                    size='large'
                    fullWidth
                >
                    Create a Task
                </Button>

            </Stack>
        </Box>
    )
}
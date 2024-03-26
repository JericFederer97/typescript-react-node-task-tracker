import React, { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { ITextField } from './interfaces/ITextField';

export const TaskTitleField: FC<ITextField> = (props): ReactElement => {
    //* Deconstruct props
    const {
        onChange = (e) => console.log(e),
        disabled = false
    } = props;

    return (
        <div>
            <TextField
                id='title'
                label='Task Title'
                placeholder='Task Title'
                variant='outlined'
                size='small'
                name='title'
                fullWidth
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    )
}

TaskTitleField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
}
import React, { FC, ReactElement, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
    //* PROPS
    const {
        value = new Date(),
        disabled = false,
        onChange = (date) => console.log(date),
    } = props;

    //! STATE - SAMPLE ONLY
    // const [date, setDate] = useState<Date | null>(null);

    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDateFns}
            >
                <DesktopDatePicker
                    label="Task Date"
                    format="yyyy/MM/dd"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}

                    //! DesktopDatePicker doesn't have "renderInput" prop
                    // renderInput={(params) => (
                    //     <TextField {...params} />
                    // )}
                />
            </LocalizationProvider>
        </>
    )
}

TaskDateField.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
}
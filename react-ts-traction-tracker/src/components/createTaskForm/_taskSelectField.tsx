import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PropTypes from 'prop-types';

import { ISelectField } from './interfaces/ISelectField';

export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
    //* Destructure props
    const {
        value = '',
        label = 'Select Box',
        name = 'selectBox',
        items = [{ value: 'default item', label: 'default item' }],
        disabled = false,
        onChange = (e: SelectChangeEvent) => console.log(e),
    } = props;

    return (
        <FormControl fullWidth size='small'>
            <InputLabel id={`${name}-id`}>{label}</InputLabel>
            <Select
                labelId={`${name}-id`}
                id={`${name}-id-select`}
                value={value}
                label={label}
                name={name}
                onChange={onChange}
                disabled={disabled}
            >
                {
                    items.map((item, index) => (
                        <MenuItem
                            key={item.value + index}
                            value={item.value}
                        >
                            {item.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}

TaskSelectField.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }).isRequired,
    )
}
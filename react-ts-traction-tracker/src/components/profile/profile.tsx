import React, { FC, ReactElement } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

//* Interfaces
interface IProfile {
    name: string,
}

export const Profile: FC<IProfile> = (props): ReactElement => {
    //* Deconstruct props
    const { name } = props;

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            {/* AVATAR */}
            <Avatar
                sx={{
                    width: '96px',
                    height: '96px',
                    backgroundColor: 'primary.main',
                    marginBottom: '16px',
                }}
            >
                <Typography
                    variant='h4'
                    color='text.primary'
                >
                    {`${name.substring(0, 1)}`}
                </Typography>
            </Avatar>

            {/* NAME */}
            <Typography
                variant='h6'
                color='text.primary'
            >
                {`${name}`}
            </Typography>

            {/* MESSAGE */}
            <Typography
                variant='body1'
                color='text.primary'
            >
                {`Welcome Piano Coder ${name}`}
            </Typography>
        </Box>
    )
}

Profile.propTypes = {
    name: PropTypes.string.isRequired,
}
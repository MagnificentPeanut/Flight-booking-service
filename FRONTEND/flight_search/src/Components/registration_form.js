import React, { useState } from 'react';
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Box, Link, Typography } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [inputs, setInputs] = useState({
        username: '',
        phoneNo: '',
        email: '',
        verifyemail: '',
        password: '',
        verifypassword: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setInputs({ ...inputs, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setInputs({
            ...inputs,
            showPassword: !inputs.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = event => {
        const userObject = {
            username: inputs.username,
            phoneNo: inputs.phoneNo,
            email: inputs.email,
            userPassword: inputs.password
        }
        console.log(userObject);

        axios.post('http://localhost:8083/users/create', userObject)
            .then((res) => {
                console.log(res.data)
                setOpen(true);
            }).catch((error) => {
                console.log(error)
            });
        event.preventDefault()
    }

    const email_error = inputs.verifyemail !== inputs.email

    const password_error = inputs.verifypassword !== inputs.password

    return (
        <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack sx={{ m: 2 }} alignItems='center' direction='column' spacing={2}>
                    <Stack alignItems='center' direction='column' spacing={0}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5' color='black' >Sign Up</Typography>
                    </Stack>
                    <Stack sx={{ m: 1, width: 'stretch' }} alignItems='center' direction='row' spacing={2}>
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            id="outlined-required-username"
                            label="username"
                            name='username'
                            value={inputs.username}
                            inputProps={{ pattern: '[a-zA-Z]{4,16}$' }}
                            onChange={handleChange('username')}
                        />
                        <TextField
                            required
                            fullWidth
                            id="outlined-required-phoneNo"
                            label="phone number"
                            name='phoneNo'
                            value={inputs.phoneNo}
                            inputProps={{ pattern: '[0-9]{10}$' }}
                            onChange={handleChange('phoneNo')}
                        />
                    </Stack>
                    <TextField
                        required
                        fullWidth
                        id="outlined-required-email"
                        label="email"
                        name='email'
                        value={inputs.email}
                        inputProps={{ pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' }}
                        onChange={handleChange('email')}
                    />
                    <FormControl sx={{ m: 1, width: 'stretch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-email">verify email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-verifyemail"
                            required
                            fullWidth
                            type='text'
                            value={inputs.verifyemail}
                            onChange={handleChange('verifyemail')}
                            endAdornment={
                                <InputAdornment position="end">
                                    {email_error ? <ClearRoundedIcon color='error' /> : <CheckRoundedIcon color='success' />}
                                </InputAdornment>
                            }
                            label="verifyemail"
                        />
                    </FormControl>
                    <Stack alignItems='center' direction='row' spacing={2}>
                        <FormControl sx={{ width: 'auto' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                required
                                fullWidth
                                type={inputs.showPassword ? 'text' : 'password'}
                                value={inputs.password}
                                inputProps={{ pattern: '[a-zA-Z0-9]{4,16}$' }}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {inputs.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="password"
                            />
                        </FormControl>
                        <FormControl sx={{ width: 'auto' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">verify password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-verifypassword"
                                required
                                fullWidth
                                type='password'
                                value={inputs.verifypassword}
                                onChange={handleChange('verifypassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        {password_error ? <ClearRoundedIcon color='error' /> : <CheckRoundedIcon color='success' />}
                                    </InputAdornment>
                                }
                                label="verifypassword"
                            />
                        </FormControl>
                    </Stack>

                    <Button variant='contained' type='submit'>Sign up</Button>
                    <Stack direction='row' spacing={1}>
                        <Typography color={'GrayText'} variant='caption'>Already a user?</Typography>
                        <Link href='/login' variant='caption'>Login</Link>
                    </Stack>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Hello {inputs.username}, you have registered successfully!
                        </Alert>
                    </Snackbar>
                </Stack>
            </form>
        </Box>
    )

}

export default Register;
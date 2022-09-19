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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
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
        const authenticationRequest = {
            username: inputs.username,
            password: inputs.password
        }
        console.log(authenticationRequest);

        axios.post('http://localhost:8083/authenticate', authenticationRequest)
            .then((res) => {
                console.log(res.data)
                if (inputs.username === 'admin') {
                    navigate('/admin', { state: { jwt: res.data.jwt } })
                }
                else {
                    navigate('/')
                }
            }).catch((error) => {
                alert(`Incorrect username or password`)
                console.log(error)
            });
        event.preventDefault()


    }

    return (
        <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <div className='form'>
                    <Stack sx={{ m: 2 }} alignItems='center' direction='column' spacing={2}>
                        <Stack alignItems='center' direction='column' spacing={0}>
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography sx={{ m: 1 }} component='h1' variant='h5' color='black'>Login</Typography>
                        </Stack>
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            id="outlined-required"
                            label="Username"
                            name='username'
                            value={inputs.username}
                            inputProps={{ pattern: '[a-zA-Z]{4,16}$' }}
                            onChange={handleChange('username')}
                        />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
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
                                label="Password"
                            />
                        </FormControl>
                        <Button variant='contained' type='submit'>Login</Button>
                        <Stack direction='row' spacing={1}>
                            <Typography color={'GrayText'} variant='caption'>Not a user?</Typography>
                            <Link href='/register' variant='caption'>Sign up</Link>
                        </Stack>
                    </Stack>
                </div>
            </form>
        </Box>
    )
}
export default Login;
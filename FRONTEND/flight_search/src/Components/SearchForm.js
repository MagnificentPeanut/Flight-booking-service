import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';


function Form() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = event => {
        console.log(inputs);
        event.preventDefault()
        navigate('/flights', { state: { origin: inputs.origin, destination: inputs.destination } })
    }

    return (
        <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack sx={{ m: 2 }} direction='row' spacing={2}>
                    <TextField
                        required
                        autoFocus
                        id="outlined-required"
                        label="From"
                        name='origin'
                        value={inputs.origin || ""}
                        inputProps={{ pattern: '[a-zA-Z]{3,15}$' }}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="To"
                        name='destination'
                        value={inputs.destination || ""}
                        inputProps={{ pattern: '[a-zA-Z]{3,15}$' }}
                        onChange={handleChange}
                    />
                    <Button variant='contained' type='submit'>Search Flight</Button>
                </Stack>
            </form>
        </Box>
    )

}

export default Form;
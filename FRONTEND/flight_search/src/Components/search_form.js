import React, { useState, Component } from 'react'
import ReactDOM from "react-dom/client";
import Flights from './flight_details';

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function Form() {
    const [inputs, setInputs] = useState({});

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = event => {
        alert(`Hello ${inputs.origin}, ${inputs.destination}, you have registered successfully!`)
        console.log(inputs);
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form'>                
                <Stack direction='row' spacing={2}>
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
            </div>
        </form>
    )

}

export default Form;
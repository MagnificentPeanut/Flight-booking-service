import React, { useState, Component } from 'react'
import ReactDOM from "react-dom/client";

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
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         origin: '',
    //         destination: ''
    //     }
    //     this.handleSubmit=this.handleSubmit.bind(this)
    // }

    // handleOriginChange = (event) => {
    //     this.setState({
    //         origin: event.target.value
    //     })
    // }

    // handleDestinationChange = (event) => {
    //     this.setState({
    //         destination: event.target.value
    //     })
    // }

    const handleSubmit = event => {
        alert(`Hello ${inputs.origin}, ${inputs.destination}, you have registered successfully!`)
        console.log(inputs);
        event.preventDefault()
    }

    // const handleReset = () => {
    //     setInputs({
    //         origin: '',
    //         destination: '',
    //     })
    // }

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
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="To"
                        name='destination'
                        value={inputs.destination || ""}
                        onChange={handleChange}
                    />
                    <Button variant='contained' type='submit'>Search Flight</Button>
                    {/* <Button variant='contained' type='reset' onClick={handleReset}>Reset</Button> */}
                </Stack>
            </div>
        </form>
    )

}

export default Form;
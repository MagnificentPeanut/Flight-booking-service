import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Box, Link, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookFlight() {
    const location = useLocation()
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phoneNo: '',
        requiredSeats: '',
    });

    const handleChange = (prop) => (event) => {
        setInputs({ ...inputs, [prop]: event.target.value });
    };

    const [bookingId, setBookingId] = useState([]);

    const handleSubmit = event => {
        const userObject = {
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            gender: inputs.gender,
            email: inputs.email,
            phoneNo: inputs.phoneNo,
            requiredSeats: inputs.requiredSeats,
            flightId: location.state.flight.flightId
        }
        console.log(userObject);

        axios.post('http://localhost:8084/booking/book', userObject)
            .then((res) => {
                console.log(res.data)
                setBookingId(res.data.bookingId)
                setOpen(true);
            }).catch((error) => {
                console.log(error)
            });
        event.preventDefault()
    }

    return (
        <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack sx={{ m: 2 }} alignItems='center' direction='column' spacing={2}>
                    <Stack sx={{ m: 1 }} alignItems='center' direction='column' spacing={0}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <AirplaneTicketIcon fontSize='medium' />
                        </Avatar>
                        <Typography component='h1' variant='h5' color='black' >Book Flight</Typography>
                        <Typography variant='caption'>
                            {location.state.flight.flightName} flight {location.state.flight.flightId} from {location.state.flight.origin} to {location.state.flight.destination}
                        </Typography>
                    </Stack>
                    <Stack sx={{ m: 1, width: 'stretch' }} alignItems='center' direction='row' spacing={2}>
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            id="outlined-required-firstName"
                            label="first name"
                            name='firstName'
                            value={inputs.firstName}
                            inputProps={{ pattern: '[a-zA-Z]{3,16}$' }}
                            onChange={handleChange('firstName')}
                        />
                        <TextField
                            required
                            fullWidth
                            id="outlined-required-lastName"
                            label="last name"
                            name='lastName'
                            value={inputs.lastName}
                            inputProps={{ pattern: '[a-zA-Z]{1,16}$' }}
                            onChange={handleChange('lastName')}
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
                    <Stack alignItems='center' direction='row' spacing={2}>
                        <FormControl>
                            <FormLabel sx={{ fontSize: "small" }} id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <ToggleButtonGroup
                                color="primary"
                                size='small'
                                value={inputs.gender}
                                exclusive
                                onChange={handleChange('gender')}
                                aria-label="gender"
                            >
                                <ToggleButton value="Male">Male</ToggleButton>
                                <ToggleButton value="Female">Female</ToggleButton>
                                <ToggleButton value="Other">Other</ToggleButton>
                            </ToggleButtonGroup>
                        </FormControl>
                        <FormControl sx={{ width: '20ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">passengers</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                required
                                fullWidth
                                type='number'
                                value={inputs.requiredSeats}
                                inputProps={{ min: 1, max: 6 }}
                                onChange={handleChange('requiredSeats')}
                                label="required seats"
                            />
                        </FormControl>
                    </Stack>
                    <Button variant='contained' type='submit'>Book Flight</Button>
                    <Stack direction='row' spacing={1}>
                        <Link href='/' variant='caption'>Go back</Link>
                    </Stack>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle align='center' id="alert-dialog-title" color='green' variant='h5' gutterBottom>
                            {"Booking Confirmed!"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" color='black'>
                                Your booking for {location.state.flight.flightName} flight {location.state.flight.flightId} from {location.state.flight.origin} to {location.state.flight.destination} has been
                                confirmed with Booking ID: {bookingId}.
                            </DialogContentText>
                            <DialogContentText id="alert-dialog-description" color='black' gutterBottom>
                                Please note down the bookingId for future use.
                            </DialogContentText>
                            <DialogContentText id="alert-dialog-description">
                                Thank you for using Generic Airlines!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </form>
        </Box>
    )

}

export default BookFlight;
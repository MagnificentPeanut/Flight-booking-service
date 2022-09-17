import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import { Stack, Typography } from '@mui/material';


const Flights = (props) => {
    const location = useLocation()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flights, setFlights] = useState([]);

    const url = "http://localhost:8081/flights/getByFromTo"

    const params = {
        origin: location.state.origin,
        destination: location.state.destination
    }

    console.log(location.state.origin, location.state.destination)

    useEffect(() => {
        axios.get(url, { params })
            .then(res => {
                console.log(res.data);
                setFlights(res.data);
                setIsLoaded(true);
            })
            .then(
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <Stack sx={{ width: 850, display: 'flex', alignItems: 'center' }}><CircularProgress /></Stack>;
    } 
    else if (flights.length === 0) {
        return (
            <Stack sx={{ width: 850, display: 'flex' }}>
                <FlightTakeoffIcon sx={{ mb: 1, fontSize: '150%', color: 'black' }} />
                <Typography component='h1' variant='caption' color='black' align='left'>
                    Departing flight
                </Typography>
                <Typography sx={{ mb: 2 }} component='h1' variant='h4' color='black' align='left'>
                    {params.origin} to {params.destination}
                </Typography>
                <Typography sx={{ mt: 5, mb: 2 }} component='h1' variant='body1' color='black' align='center'>
                    Oops! Looks like there are no current flights from {params.origin} to {params.destination}
                </Typography>
            </Stack>
        );
    } 
    else {
        return (
            <Stack>
                <FlightTakeoffIcon sx={{ mb: 1, fontSize: '150%', color: 'black' }} />
                <Typography component='h1' variant='caption' color='black' align='left'>
                    Departing flight
                </Typography>
                <Typography sx={{ mb: 2 }} component='h1' variant='h4' color='black' align='left'>
                    {params.origin} to {params.destination}
                </Typography>
                <TableContainer component={Paper} elevation={5} sx={{ maxHeight: 400 }} >
                    <Table sx={{ minWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Airline</TableCell>
                                <TableCell>Departure Time</TableCell>
                                <TableCell>Arrival Time</TableCell>
                                <TableCell align="right">Seats</TableCell>
                                <TableCell align="right">Fare</TableCell>
                                <TableCell align="center">Book</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {flights.map((flight) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    key={flight.flightId}
                                >
                                    <TableCell component="th" scope="row">
                                        {flight.flightName}
                                    </TableCell>
                                    <TableCell>{flight.departureTime}</TableCell>
                                    <TableCell>{flight.arrivalTime}</TableCell>
                                    <TableCell align="right">{flight.seats}</TableCell>
                                    <TableCell align="right"><CurrencyRupeeIcon fontSize='inherit' />{flight.fare}</TableCell>
                                    <TableCell sx={{ maxWidth: 40 }} align="center">
                                        <Button href='/login' variant='contained' color="inherit">Book</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        );
    }
}
export default Flights;
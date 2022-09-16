import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Stack, Typography } from '@mui/material';


const Flights = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flights, setFlights] = useState([]);

    const url = "http://localhost:8081/flights/getByFromTo"

    const params = {
        origin: 'Chennai',
        destination: 'Cochin'
    }

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
        return <div>Loading...</div>;
    } else {
        return (
            <Stack>
                <Typography sx={{ mb: 2}} component='h1' variant='h4' color='black' align='left'>
                    {params.origin} to {params.destination}
                </Typography>
                <TableContainer component={Paper} elevation={5} >
                    <Table sx={{ minWidth: 850 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Flight name</TableCell>
                                <TableCell align="right">Departure Time</TableCell>
                                <TableCell align="right">Arrival Time</TableCell>
                                <TableCell align="right">Seats</TableCell>
                                <TableCell align="right">Fare</TableCell>
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
                                    <TableCell align="right">{flight.departureTime}</TableCell>
                                    <TableCell align="right">{flight.arrivalTime}</TableCell>
                                    <TableCell align="right">{flight.seats}</TableCell>
                                    <TableCell align="right"><CurrencyRupeeIcon fontSize='inherit' />{flight.fare}</TableCell>
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
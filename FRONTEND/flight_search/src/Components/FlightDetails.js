import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Box, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: blue[800],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Flights = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flights, setFlights] = useState([]);

    const url = "http://localhost:8084/flights/getByFromTo"

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
        return (
            <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                <Stack sx={{ m: 2, width: 850, display: 'flex', alignItems: 'center' }}>
                    <CircularProgress />
                </Stack>
            </Box>
        )
    }
    else if (flights.length === 0) {
        return (
            <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                <Stack sx={{ m: 2, width: 850, display: 'flex' }}>
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
            </Box>
        );
    }
    else {
        return (
            <Box component={Paper} elevation={5} sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                <Stack sx={{ m: 2 }}>
                    <FlightTakeoffIcon sx={{ mb: 1, fontSize: '150%', color: 'black' }} />
                    <Typography component='h1' variant='caption' color='black' align='left'>
                        Departing flight
                    </Typography>
                    <Typography sx={{ mb: 2 }} component='h1' variant='h4' color='black' align='left'>
                        {params.origin} to {params.destination}
                    </Typography>
                    <TableContainer sx={{ maxHeight: 400, borderRadius: 2 }} >
                        <Table sx={{ minWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Airline</StyledTableCell>
                                    <StyledTableCell>Departure Time</StyledTableCell>
                                    <StyledTableCell>Arrival Time</StyledTableCell>
                                    <StyledTableCell align="right">Seats</StyledTableCell>
                                    <StyledTableCell align="right">Fare</StyledTableCell>
                                    <StyledTableCell align="center">Book</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flights.map((flight) => (
                                    <StyledTableRow
                                        key={flight.flightId}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {flight.flightName}
                                        </StyledTableCell>
                                        <StyledTableCell>{flight.departureTime}</StyledTableCell>
                                        <StyledTableCell>{flight.arrivalTime}</StyledTableCell>
                                        <StyledTableCell align="right">{flight.seats}</StyledTableCell>
                                        <StyledTableCell align="right"><CurrencyRupeeIcon fontSize='inherit' />{flight.fare}</StyledTableCell>
                                        <StyledTableCell sx={{ maxWidth: 40 }} align="center">
                                            <Button variant='contained' onClick={() => navigate('/book', {state: {flight : flight}})}>Book</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Box>
        );
    }
}
export default Flights;
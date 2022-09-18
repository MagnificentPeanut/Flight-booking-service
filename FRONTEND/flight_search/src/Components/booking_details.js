import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Box, Stack, Typography } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function GetBookingDetails() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [booking, setBooking] = useState([]);

    const url = "http://localhost:8082/booking/getAll"

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setBooking(res.data);
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
            <Stack sx={{ m: 1 }} alignItems='center' direction='row' spacing={2}>
                <Card sx={{ minWidth: 345, maxWidth: 785 }}>
                    <CardHeader sx={{ bgcolor: blue[800] }}
                        title={
                            <Typography variant='h6' color='white'>
                                Booking Details
                            </Typography>
                        }
                    />
                    <CardActions disableSpacing>
                        <Typography color='gray' variant='body2' sx={{ ml: 1 }}>
                            click the arrow to see all booking details
                        </Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Box sx={{ backgroundColor: 'white', borderRadius: 2 }}>
                                <Stack sx={{ width: 700, display: 'flex', alignItems: 'center' }}>
                                    <CircularProgress />
                                </Stack>
                            </Box>
                        </CardContent>
                    </Collapse>
                </Card>
            </Stack>
        )
    }

    return (
        <Stack alignItems='center' direction='row' spacing={2}>
            <Card sx={{ minWidth: 345, maxWidth: 785 }}>
                <CardHeader sx={{ bgcolor: blue[900] }}
                    title={
                        <Typography variant='h6' color='white'>
                            Booking Details
                        </Typography>
                    }
                />
                <CardActions disableSpacing>
                    <Typography color='gray' variant='body2' sx={{ ml: 1 }}>
                        click the arrow to see all booking details
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TableContainer sx={{ maxHeight: 240 }} >
                            <Table sx={{ minWidth: 800 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Booking ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone No</TableCell>
                                        <TableCell>Booked Seats</TableCell>
                                        <TableCell>Flight ID</TableCell>
                                        <TableCell>Airline</TableCell>
                                        <TableCell>Origin</TableCell>
                                        <TableCell>Destination</TableCell>
                                        <TableCell>Departure Time</TableCell>
                                        <TableCell>Arrival Time</TableCell>
                                        <TableCell align="right">Seats</TableCell>
                                        <TableCell align="right">Fare</TableCell>
                                        <TableCell align="right">Booked On</TableCell>
                                        <TableCell align="right">Updated On</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {booking.map((book) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={book.bookingId}
                                        >
                                            <TableCell component="th" scope="row">
                                                {book.bookingId}
                                            </TableCell>
                                            <TableCell>{book.firstName}</TableCell>
                                            <TableCell>{book.lastName}</TableCell>
                                            <TableCell>{book.gender}</TableCell>
                                            <TableCell>{book.email}</TableCell>
                                            <TableCell>{book.phoneNo}</TableCell>
                                            <TableCell>{book.requiredSeats}</TableCell>
                                            <TableCell>{book.flightId}</TableCell>
                                            <TableCell>{book.flights.flightName}</TableCell>
                                            <TableCell>{book.flights.origin}</TableCell>
                                            <TableCell>{book.flights.destination}</TableCell>
                                            <TableCell>{book.flights.departureTime}</TableCell>
                                            <TableCell>{book.flights.arrivalTime}</TableCell>
                                            <TableCell align="right">{book.flights.seats}</TableCell>
                                            <TableCell sx={{ minWidth: 55 }} align="right"><CurrencyRupeeIcon fontSize='inherit' />{book.flights.fare}</TableCell>
                                            <TableCell align="right">{book.bookedOn}</TableCell>
                                            <TableCell align="right">{book.updatedOn}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Collapse>
            </Card>
        </Stack>
    );
}

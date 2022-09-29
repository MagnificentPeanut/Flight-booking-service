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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack, Typography } from '@mui/material';

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

    const url = "http://localhost:8084/booking/getAll"

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
                        <TableContainer sx={{ maxHeight: 310, borderRadius: 1 }} >
                            <Table stickyHeader sx={{ minWidth: 2000 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Booking ID</StyledTableCell>
                                        <StyledTableCell>First Name</StyledTableCell>
                                        <StyledTableCell>Last Name</StyledTableCell>
                                        <StyledTableCell>Gender</StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell>Phone No</StyledTableCell>
                                        <StyledTableCell>Booked Seats</StyledTableCell>
                                        <StyledTableCell>Flight ID</StyledTableCell>
                                        <StyledTableCell>Airline</StyledTableCell>
                                        <StyledTableCell>Origin</StyledTableCell>
                                        <StyledTableCell>Destination</StyledTableCell>
                                        <StyledTableCell>Departure Time</StyledTableCell>
                                        <StyledTableCell>Arrival Time</StyledTableCell>
                                        <StyledTableCell align="right">Seats</StyledTableCell>
                                        <StyledTableCell align="right">Fare</StyledTableCell>
                                        <StyledTableCell align="right">Booked On</StyledTableCell>
                                        <StyledTableCell align="right">Updated On</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {booking.map((book) => (
                                        <StyledTableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={book.bookingId}
                                        >
                                            <StyledTableCell component="th" scope="row">
                                                {book.bookingId}
                                            </StyledTableCell>
                                            <StyledTableCell>{book.firstName}</StyledTableCell>
                                            <StyledTableCell>{book.lastName}</StyledTableCell>
                                            <StyledTableCell>{book.gender}</StyledTableCell>
                                            <StyledTableCell>{book.email}</StyledTableCell>
                                            <StyledTableCell>{book.phoneNo}</StyledTableCell>
                                            <StyledTableCell>{book.requiredSeats}</StyledTableCell>
                                            <StyledTableCell>{book.flightId}</StyledTableCell>
                                            <StyledTableCell>{book.flights.flightName}</StyledTableCell>
                                            <StyledTableCell>{book.flights.origin}</StyledTableCell>
                                            <StyledTableCell>{book.flights.destination}</StyledTableCell>
                                            <StyledTableCell>{book.flights.departureTime}</StyledTableCell>
                                            <StyledTableCell>{book.flights.arrivalTime}</StyledTableCell>
                                            <StyledTableCell align="right">{book.flights.seats}</StyledTableCell>
                                            <StyledTableCell sx={{ minWidth: 55 }} align="right"><CurrencyRupeeIcon fontSize='inherit' />{book.flights.fare}</StyledTableCell>
                                            <StyledTableCell align="right">{book.bookedOn}</StyledTableCell>
                                            <StyledTableCell align="right">{book.updatedOn}</StyledTableCell>
                                        </StyledTableRow>
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

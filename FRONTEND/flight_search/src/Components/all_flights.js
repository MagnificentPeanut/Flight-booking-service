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
import Button from '@mui/material/Button';
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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

export default function GetAllFlights() {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flights, setFlights] = useState([]);

    const url = "http://localhost:8081/flights/getAll"

    const deleteUrl = "http://localhost:8081/flights/delete/"

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = flight => {
        console.log(flight.flightId)
        axios.delete(deleteUrl + flight.flightId)
            .then((res) => {
                console.log(res.data)
                setOpen(true);
            }).catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        axios.get(url)
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
            <Stack alignItems='center' direction='row' spacing={2}>
                <Card sx={{ minWidth: 345, maxWidth: 785 }}>
                    <CardHeader sx={{ bgcolor: blue[800] }}
                        title={
                            <Typography variant='h6' color='white'>
                                Flight Details
                            </Typography>
                        }
                    />
                    <CardActions disableSpacing>
                        <Typography color='gray' variant='body2' sx={{ ml: 1 }}>
                            click the arrow to see all flight details
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
                            Flight Details
                        </Typography>
                    }
                />
                <CardActions disableSpacing>
                    <Typography color='gray' variant='body2' sx={{ ml: 1 }}>
                        get/delete flight details
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
                        <FlightTakeoffIcon sx={{ fontSize: '150%', color: 'black' }} />
                        <Typography component='h1' variant='caption' color='black' align='left' sx={{ mb: 2 }}>
                            Departing flights
                        </Typography>
                        <TableContainer sx={{ maxHeight: 240 }} >
                            <Table sx={{ minWidth: 800 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Flight ID</TableCell>
                                        <TableCell>Airline</TableCell>
                                        <TableCell>Origin</TableCell>
                                        <TableCell>Destination</TableCell>
                                        <TableCell>Departure Time</TableCell>
                                        <TableCell>Arrival Time</TableCell>
                                        <TableCell align="right">Seats</TableCell>
                                        <TableCell align="right">Fare</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {flights.map((flight) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={flight.flightId}
                                        >
                                            <TableCell component="th" scope="row">
                                                {flight.flightId}
                                            </TableCell>
                                            <TableCell>{flight.flightName}</TableCell>
                                            <TableCell>{flight.origin}</TableCell>
                                            <TableCell>{flight.destination}</TableCell>
                                            <TableCell>{flight.departureTime}</TableCell>
                                            <TableCell>{flight.arrivalTime}</TableCell>
                                            <TableCell align="right">{flight.seats}</TableCell>
                                            <TableCell sx={{ minWidth: 55 }} align="right"><CurrencyRupeeIcon fontSize='inherit' />{flight.fare}</TableCell>
                                            <TableCell align="center">
                                                <Button size='small' variant='contained' color="error" onClick={() => handleDelete(flight)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Collapse>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Flight deleted successfully!
                </Alert>
            </Snackbar>
        </Stack>
    );
}

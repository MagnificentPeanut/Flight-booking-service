import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';
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

export default function GetUserDetails() {
    const location = useLocation()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    let config = {
        headers: {
            Authorization: "Bearer " + location.state.jwt
        }
    }

    const url = "http://localhost:8083/users/getAll"

    const deleteUrl = "http://localhost:8083/users/delete/"

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = user => {
        console.log(user.userId)
        axios.delete(deleteUrl + user.userId, config)
            .then((res) => {
                console.log(res.data)
                setOpen(true);
            }).catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        axios.get(url, config)
            .then(res => {
                console.log(res.data);
                setUser(res.data);
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
                                User Details
                            </Typography>
                        }
                    />
                    <CardActions disableSpacing>
                        <Typography color='gray' variant='body2' sx={{ ml: 1 }}>
                            get/delete user details
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
                            User Details
                        </Typography>
                    }
                />
                <CardActions disableSpacing>
                    <Typography color='gray' variant='body2' sx={{ ml: 1 }}>
                        get/delete user details
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
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Phone No</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>User Password</TableCell>
                                        <TableCell align="center">Delete User</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.map((user) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={user.userId}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.userId}
                                            </TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.phoneNo}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.userPassword}</TableCell>
                                            <TableCell align="center">
                                                <Button size='small' variant='contained' color="error" onClick={() => handleDelete(user)}>Delete</Button>
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
                    User deleted successfully!
                </Alert>
            </Snackbar>
        </Stack>
    );
}

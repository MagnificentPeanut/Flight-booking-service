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
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack, Typography } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
                        <TableContainer sx={{ maxHeight: 310, borderRadius: 1 }} >
                            <Table stickyHeader sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>User ID</StyledTableCell>
                                        <StyledTableCell>Username</StyledTableCell>
                                        <StyledTableCell>Phone No</StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell>Password</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.map((user) => (
                                        <StyledTableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            key={user.userId}
                                        >
                                            <StyledTableCell component="th" scope="row">
                                                {user.userId}
                                            </StyledTableCell>
                                            <StyledTableCell>{user.username}</StyledTableCell>
                                            <StyledTableCell>{user.phoneNo}</StyledTableCell>
                                            <StyledTableCell>{user.email}</StyledTableCell>
                                            <StyledTableCell>{user.userPassword}</StyledTableCell>
                                            <StyledTableCell align="center">
                                            <Tooltip title={'Delete ' + user.username + ', ID: ' + user.userId} >
                                                    <IconButton
                                                        size='small'
                                                        variant='contained'
                                                        color="error"
                                                        onClick={() => handleDelete(user)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                        </StyledTableRow>
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

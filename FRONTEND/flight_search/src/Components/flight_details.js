import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Flights = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [flights, setFlights] = useState([]);

    const url = "http://localhost:8084/flights/getAll"
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
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1>Employee Details</h1>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Flight Name</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Departure Time</th>
                            <th>Arrival</th>
                            <th>Seats</th>
                            <th>Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map(flight =>
                                <tr key={flight.flightId}>
                                    <td>{flight.flightName}</td>
                                    <td>{flight.origin}</td>
                                    <td>{flight.destination}</td>
                                    <td>{flight.departureTime}</td>
                                    <td>{flight.arrivalTime}</td>
                                    <td>{flight.seats}</td>
                                    <td>{flight.fare}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <Link to="/login"><button>User</button>
                </Link>
            </div>
        );
    }
}
export default Flights;
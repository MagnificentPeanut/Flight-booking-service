import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Form from './SearchForm';
import ButtonAppBar from './ButtonAppBar';
import Login from './LoginForm.js';
import Flights from './FlightDetails';
import Register from './RegistrationForm';
import Dashboard from './AdminProfile';
import About from './About';

const Webpages = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Form />} />
                <Route path="/appbar" element= {<ButtonAppBar />} />
                <Route path='/login' element = {<Login />} />
                <Route path='/flights' element = {<Flights />} />
                <Route path='/register' element = {<Register />} />
                <Route path='/admin' element = {<Dashboard />} />
                <Route path='/about' element = {<About />} />
            </Routes>
        </Router>
    );
};

export default Webpages;
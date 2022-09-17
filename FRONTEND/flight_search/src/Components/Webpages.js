import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Form from './search_form';
import ButtonAppBar from './ButtonAppBar';
import Login from './login_form.js';
import Flights from './flight_details';
import Register from './registration_form';
import Dashboard from './admin_profile';
import About from './about';

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
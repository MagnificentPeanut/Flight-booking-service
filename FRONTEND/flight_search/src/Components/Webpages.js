import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Form from './search_form';
import ButtonAppBar from './ButtonAppBar';
import Login from './login_form.js';
import Flights from './flight_details';

const Webpages = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" element= {<Form />} />
                <Route path="/appbar" element= {<ButtonAppBar />} />
                <Route path='/login' element = {<Login />} />
                <Route path='/flights' element = {<Flights />} />
            </Routes>
        </Router>
    );
};

export default Webpages;
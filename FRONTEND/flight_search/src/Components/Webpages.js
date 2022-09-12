import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Form from './search_form';

const Webpages = () => {

    return(
        <Router>
            <Routes>
                <Route path="/" exact component= {Form} />
            </Routes>
        </Router>
    );
};

export default Webpages;
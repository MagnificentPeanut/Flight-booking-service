import React, { Component } from 'react';
import Webpages from './Components/Webpages';
import Form from './Components/search_form'
import './App.css';

function App() {
  return (
    <div className='App'>
      
      <div className='TopBar'>
        <h2>
          Login
        </h2>
      </div>
      <div className='Name'>
        <h2>
          Generic Airlines
        </h2>
      </div>
      <div className='main'>
        <Form />
      </div>
    </div>
  );
}

export default App;

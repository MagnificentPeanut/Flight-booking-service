import React, { Component } from 'react';

import Webpages from './Components/Webpages';
import ButtonAppBar from './Components/ButtonAppBar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='topbar'>
        <ButtonAppBar/>
      </div>
      <div className='main'>
        <Webpages />
      </div>
    </div>
  );
}

export default App;

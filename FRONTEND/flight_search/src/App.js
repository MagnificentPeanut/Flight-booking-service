import React from 'react';

import Webpages from './Components/Webpages';
import StaticAppBar from './Components/StaticAppBar';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='topbar'>
        <StaticAppBar/>
      </div>
      <Webpages />
    </div>
  );
}

export default App;

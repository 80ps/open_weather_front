import React from 'react';
import Weather from './weather';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Weather/>
      <App/>
    </BrowserRouter>
    </div>
  );
}


export default App;

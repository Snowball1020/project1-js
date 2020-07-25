import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//Router set up
import { BrowserRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


ReactDOM.render(
  //Wrap App with BrowserRouter so it can perform routes function inside App
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

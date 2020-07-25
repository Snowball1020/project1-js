import React, { useState } from 'react';
import Routes from "./Routes"
//components for shared nav
import Nav from "./shared/Nav"
//Toastify Container and Css
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {

  //user data is managed here so it can pass it down to any components from here
  const [user, setUser] = useState(false)

  return (
    <>
      <ToastContainer />
      <Nav user={user} />
      <Routes user={user} setUser={setUser} />
    </>
  );
}

export default App;

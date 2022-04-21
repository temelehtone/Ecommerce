import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar navigate={navigate}/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

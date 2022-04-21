import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

import NavBar from "./NavBar";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import AlertDismissible from "./AlertDismissible";


const App = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false)

  return (
    <>
      <NavBar navigate={navigate}/>
      {loading ? <LinearProgress color="secondary" /> : null}
      {alert ? (
          <AlertDismissible {...alert} deleteAlert={() => setAlert(null)} />
        ) : null}
      <Routes>
        <Route exact path="/" element={<HomePage  />} />
        <Route path="/sign-up" element={<SignUp setAlert={setAlert} setLoading={setLoading} setUser={setUser} />} />
        <Route path="/sign-in" element={<Login setAlert={setAlert} />} />
      </Routes>
    </>
  );
};

export default App;

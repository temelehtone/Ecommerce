import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createAccount } from "../redux/actions/authActions";
import { isAuthenticated } from "../helpers/auth";
import { ErrorAlert } from "../helpers/message";

// Redux
import { useDispatch } from "react-redux"



export default function SignUp() {
  const theme = createTheme();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [clientSideErrorMsg, setClientsideErrorMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      if(isAuthenticated().role === 1) {
        navigate("/admin/dashboard")
      } else if (isAuthenticated().role === 0) {
        navigate("/user/dashboard");
      }
      setClientsideErrorMsg("Sign out first!")
    } 
    
  }, [navigate])

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.fname = "Firstname is required!";
    }
    if (!values.lastName) {
      errors.lname = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isEmpty = (items) => {
    for (const key of Object.keys(items)) {
      if (items[key] !== "") return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
    if (!isEmpty(errors)) return;

    const { firstName, lastName, email, password, confirmPassword } = formData;
    const data = { firstName, lastName, email, password, confirmPassword };

    dispatch(createAccount(data, navigate));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg}/>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                <p style={{ color: "red" }}>{formErrors.fname}</p>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                <p style={{ color: "red" }}>{formErrors.lname}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <p style={{ color: "red" }}>{formErrors.email}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <p style={{ color: "red" }}>{formErrors.password}</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                />
                <p style={{ color: "red" }}>{formErrors.confirmPassword}</p>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

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

import { createAccount } from "../redux/actions/authActions";
import { isAuthenticated } from "../helpers/auth";
import { ErrorAlert } from "../helpers/message";

// Redux
import { useDispatch } from "react-redux"
// Translations
import { getTranslatedText as t } from "../translations";



export default function SignUp() {
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
      setClientsideErrorMsg(t("SIGN_OUT_FIRST"))
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
      errors.fname = t('FIRSTNAME_REQUIRED');
    }
    if (!values.lastName) {
      errors.lname = t('LASTNAME_REQUIRED');
    }
    if (!values.email) {
      errors.email = t('EMAIL_REQUIRED');
    } else if (!regex.test(values.email)) {
      errors.email = t('INVALID_EMAIL');
    }
    if (!values.password) {
      errors.password = t('PASSWORD_REQUIRED');
    } else if (values.password.length < 6) {
      errors.password = t('TOO_SHORT_PASSWORD');
    } else if (values.password.length > 16) {
      errors.password = t('TOO_LONG_PASSWORD');
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = t('PASSWORD_REQUIRED');
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = t('PASSWORD_DONT_MATCH');
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
            {t('SIGN_UP')}
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
                  label={t('FIRSTNAME')}
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
                  label={t('LASTNAME')}
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
                  label={t('EMAIL_ADDRESS')}
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
                  label={t('PASSWORD')}
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
                  label={t('CONFIRM_PASSWORD')}
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
              {t('SIGN_UP')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                {t('ALREADY_ACCOUNT')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

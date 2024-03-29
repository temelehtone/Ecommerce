import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
import isEmpty from "validator/lib/isEmpty";


import { login } from "../../redux/actions/authActions"
import { isAuthenticated } from "../../helpers/auth";
import { ErrorAlert } from "../../helpers/message";

// Redux
import { useDispatch } from "react-redux";
// Translations
import { getTranslatedText as t } from "../../translations";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [clientSideErrorMsg, setClientsideErrorMsg] = useState('')

  const location = useLocation();

  useEffect(() => {

    if (isAuthenticated()) {
      if(isAuthenticated().role === 1) {
        navigate("/admin/dashboard")
      } else if (isAuthenticated().role === 0) {
        navigate("/user/dashboard");
      }
      setClientsideErrorMsg("Sign out first.")
    } 
    
  }, [navigate])

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const emptyCheck = (data) => {
    if (isEmpty(data.email) || isEmpty(data.password)) {
      setClientsideErrorMsg("All fields are required.")
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = emptyCheck(formData);
    if (check) return;

    const { email, password } = formData;
    const data = { email, password };
    dispatch(login(data, navigate, location));
  };

  return (
      <Container component="main" maxWidth="xs">
        {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg}/>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('LOGIN')}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2}}
            >
              {t('LOGIN')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {t('DONT_HAVE_ACCOUNT')}
                  
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Login;

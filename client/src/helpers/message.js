import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

export const showErrorMsg = (msg) => (

  <Alert
    variant="filled"
    severity="error"
  >
    {msg}
  </Alert>
);

export const showSuccessMsg = (msg) => (

      <Alert
        variant="filled"
        severity="success"
      >
        {msg}
      </Alert>
);

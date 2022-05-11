import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

export default function AlertDismissible({ message, severity, setAlert }) {

  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
      setAlert(null)
    }, 4000)

    return () => {
      clearTimeout(timeId)
    }
  }, [setAlert]);

  if (show) {
    return (
      <Alert
      variant="filled"
        severity={severity}
        onClose={() => {
          setShow(false);
          setAlert(null)
        }}
      >
        {message}
      </Alert>
    );
  }

  return null;
}

import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";

export const ShowErrorMsg = (msg) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 4000);

    return () => {
      clearTimeout(timeId);
    };
  }, [msg]);
  if (show) {
    return (
      <Alert
        variant="filled"
        severity="error"
        onClose={() => {
          setShow(false);
        }}
      >
        {msg}
      </Alert>
    );
  }
};

export const ShowSuccessMsg = (msg) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 4000);

    return () => {
      clearTimeout(timeId);
    };
  }, [msg]);
  if (show) {
    return (
      <Alert
        variant="filled"
        severity="success"
        onClose={() => {
          setShow(false);
        }}
      >
        {msg}
      </Alert>
    );
  }
};

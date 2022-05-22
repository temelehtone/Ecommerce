import React, {useEffect, useState} from "react";
import { Alert } from "@mui/material";

import { clearMessages } from "../redux/actions/messageActions"
// Redux
import { useDispatch } from "react-redux"

export const ErrorAlert = ({ message }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 4 seconds set the show value to false
      setShow(false)
      dispatch(clearMessages())
    }, 4000)

    return () => {
      clearTimeout(timeId)
    }
  }, [dispatch]);

  if (show) {
    return (
      <Alert
      variant="filled"
        severity="error"
        onClose={() => {
          setShow(false);
          dispatch(clearMessages())
        }}
      >
        {message}
      </Alert>
    );
  }
  return null
}

export const SuccessAlert = ({ message }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 4 seconds set the show value to false
      setShow(false)
      dispatch(clearMessages())
    }, 4000)

    return () => {
      clearTimeout(timeId)
    }
  }, [dispatch]);

  if (show) {
    return (
      <Alert
      variant="filled"
        severity="success"
        onClose={() => {
          setShow(false);
          dispatch(clearMessages())
        }}
      >
        {message}
      </Alert>
    );
  }
  return null
}

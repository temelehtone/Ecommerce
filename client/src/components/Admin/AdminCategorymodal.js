import React, { useState } from 'react'
import isEmpty from "validator/lib/isEmpty";
// Styles
import { Box, Typography, Button } from "@mui/material"
import { CustomModal, ButtonBox, StyledTextField } from '../styles'
// Helpers
import { ErrorAlert, SuccessAlert } from '../../helpers/message'
import { showLoading } from "../../helpers/loading";
// Actions
import { createCategory } from "../../redux/actions/categoryActions"
// Redux
import { useSelector, useDispatch } from "react-redux";

const AdminCategorymodal = ({ openCategory, setOpenCategory }) => {
    const { loading } = useSelector(state => state.loading)
    const [category, setCategory] = useState("")
    const dispatch = useDispatch();

    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleCategoryClose = () => {
        setOpenCategory(false);
        setCategory("");
        setSuccessMessage("")
        setErrorMessage("")
      };
    const handleCategoryChange = (e) => {
        setErrorMessage("")
        setCategory(e.target.value);
      };
      const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(category)) {
          setClientSideErrorMsg("Category can't be empty.")
          return;
        }
        const data = { category };
        dispatch(createCategory(data, setErrorMessage, setSuccessMessage));
        setCategory("")
      };
  return (
    <CustomModal
      open={openCategory}
      onClose={handleCategoryClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "white",
          flexDirection: "column",
        }}
        
      >
          <ButtonBox
            sx={{
              bgcolor: "secondary.green",
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "100px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{ ml: 3, color: "#fff" }}
            >
              Add Category
            </Typography>
          </ButtonBox>
        {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg}/>}
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        {successMessage && <SuccessAlert message={successMessage}/>}

        {loading ? (
          showLoading()
        ) : (
          <>
            <Typography sx={{ ml: 3, mt: 3 }}>Category</Typography>
            <StyledTextField
              onChange={handleCategoryChange}
              name="category"
              value={category}
            />
            <ButtonBox onSubmit={handleCategorySubmit}
        component="form">
              <Button
                sx={{
                  bgcolor: "#8E8E8E",
                  color: "white",
                  width: "100px",
                  my: 2,
                  "&:hover": { bgcolor: "red" },
                }}
                onClick={handleCategoryClose}
              >
                Close
              </Button>
              <Button
                sx={{
                  bgcolor: "secondary.green",
                  color: "white",
                  width: "100px",
                  my: 2,
                  "&:hover": { bgcolor: "secondary.greenHover" },
                }}
                type="submit"
              >
                Submit
              </Button>
            </ButtonBox>
          </>
        )}
      </Box>
    </CustomModal>
  )
}

export default AdminCategorymodal
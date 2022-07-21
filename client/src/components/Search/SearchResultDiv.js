import { Box, Drawer } from '@mui/material'
import React from 'react'

const SearchResultDiv = () => {
  return (
    <Drawer anchor="top" variant='persistent' open={true} sx={{position: "relative", top: {sx: "68px", md: "54px"}, left: "calc(50% - 10%)", height: "300px", width: "500px", bgcolor: "red" }}>SearchResultDiv</Drawer>
  )
}

export default SearchResultDiv
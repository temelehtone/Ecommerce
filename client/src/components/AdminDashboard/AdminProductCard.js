import React from "react";
// Styles
import { Card, Box } from "@mui/material";

const AdminProductCard = ({ p }) => {
  return (
    <>
      <Card key={p._id} sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <img
            src={`http://localhost:5000/uploads/${p.fileName}`}
            alt="product-img"
            style={{ height: 300 }}
          />
          <h1>{p.productName}</h1>
        </Box>
      </Card>
    </>
  );
};

export default AdminProductCard;

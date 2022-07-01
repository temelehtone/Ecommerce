import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductCard = ({ p }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        key={p._id}
        sx={{
          maxWidth: 345,
          textAlign: "center",
          transition: "box-shadow 125ms ease-in-out 0s",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.36) 0px 8px 16px",
          },
        }}
        onClick={() => navigate(`/shop/product/${p._id}`)}
      >
        <a href="#!" style={{ all: "unset", cursor: "pointer" }}>
          <CardMedia
            component="img"
            height="400"
            image={`http://localhost:5000/uploads/${p.fileName}`}
            alt="product-img"
          />
          <CardHeader sx={{ textAlign: "center" }} title={p.productName} />
          <hr />
          <CardContent sx={{ height: 50 }}>
            {p.productDescription.length < 90 ? (
              <Typography variant="body2">{p.productDescription}</Typography>
            ) : (
              <Typography variant="body2">
                {p.productDescription.substring(0, 90) + "..."}
              </Typography>
            )}
          </CardContent>
          <hr />
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mx: 3,
            }}
          >
            <Typography variant="h4" sx={{ color: "red" }}>
              {p.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
            <Button>
              <AddShoppingCartIcon />
            </Button>
          </CardActions>
        </a>
      </Card>
    </>
  );
};

export default ProductCard;

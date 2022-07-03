import React from "react";
import { useNavigate } from "react-router-dom";
import { getTranslatedText as t } from "../../translations";
// Styles
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { ButtonBox, theme } from "../styles/styles";

const ProductCard = ({ p }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(p))
  }
  return (
    <>
      <Card
        key={p._id}
        sx={{
          maxWidth: 345,
          textAlign: "center",
          transition: "box-shadow 125ms ease-in-out 0s",
        }}
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
          <Box sx= {{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: "red" }}>
              {p.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Typography>
            </Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mx: 3,
            }}
          >
            
            <ButtonBox >
            <Button onClick={() => navigate(`/shop/product/${p._id}`)} sx={{ bgcolor: theme.palette.primary.color2 }}>
              {t('VIEW_PRODUCT')}
            </Button>
            <Button onClick={handleAddToCart}>
              <AddShoppingCartIcon />
            </Button>
            </ButtonBox>
          </CardActions>
        </a>
      </Card>
    </>
  );
};

export default ProductCard;

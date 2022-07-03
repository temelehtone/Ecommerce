import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
// Styles
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  CardContent,
  Typography,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "../styles/styles";
import { getTranslatedText as t} from "../../translations";

// Redux
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../redux/actions/productActions";

const AdminProductCard = ({ p }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card key={p._id} sx={{ maxWidth: 345, textAlign: "center", boxShadow: "0px 8px 16px black"}}>
        <CardMedia
          component="img"
          height="400"
          image={`http://localhost:5000/uploads/${p.fileName}`}
          alt="product-img"
        />
        <CardHeader
          sx={{ textAlign: "center" }}
          title={p.productName}
          subheader={p.productPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        />
        <hr />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">{p.productDescription}</Typography>
          </CardContent>
        </Collapse>
        <CardContent sx={{ height: 100}}>
          {p.productDescription.length < 90 ? (
            <Typography variant="body2">{p.productDescription}</Typography>
          ) : (
            <>
              {expanded ? (
                null
              ) : (
                <Typography variant="body2">{p.productDescription.substring(0, 90)}</Typography>
              )}
              <CardActions>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
            </>
          )}
        </CardContent>
        
        <hr />
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => navigate(`/admin/edit/product/${p._id}`)}>
            <EditIcon />
            {t('EDIT')}
          </Button>
          <Button onClick={() =>dispatch(deleteProduct(p._id))}>
            <DeleteIcon />
            {t('DELETE')}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AdminProductCard;

import React, { useState } from "react";
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
import { ExpandMore } from "./styles";

// Redux
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../redux/actions/productActions";

const AdminProductCard = ({ p }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card key={p._id} sx={{ maxWidth: 345, textAlign: "center" }}>
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
        <CardContent>
          {p.productDescription.length < 100 ? (
            <Typography variant="body2">{p.productDescription}</Typography>
          ) : (
            <>
              {expanded ? (
                null
              ) : (
                <Typography variant="body2">{p.productDescription.substring(0, 100)}</Typography>
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
          <Button>
            <EditIcon />
            Edit
          </Button>
          <Button sx={{ color: "red" }} onClick={() =>dispatch(deleteProduct(p._id))}>
            <DeleteIcon />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AdminProductCard;

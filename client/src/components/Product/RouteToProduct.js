import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
// Styles
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import HomeIcon from '@mui/icons-material/Home'
import { Box } from '@mui/system'

// Redux
import { getCategory } from "../../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";

const RouteToProduct = ({ product }) => {
    const dispatch = useDispatch();
    const { category } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategory(product.productCategory))
      }, [dispatch, product])
  return (
    <Box sx={{ display: 'flex' }}>
        <Link to="/"><HomeIcon /></Link>
        <ArrowRightIcon />
        <Link to={`/shop/category/${product.productCategory}`}>{category && category.category}</Link>
        <ArrowRightIcon />
        <Link to={`/shop/product/${product._id}`}>{product.productName}</Link>
    </Box>
  )
}

export default RouteToProduct
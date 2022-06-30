import React, { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from '../redux/actions/categoryActions';



const CategoryProductsPage = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    const { category } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategory(categoryId))
    }, [dispatch, categoryId])
  return (
    <div>
        <h1>{category.category}</h1>
    </div>
  )
}

export default CategoryProductsPage
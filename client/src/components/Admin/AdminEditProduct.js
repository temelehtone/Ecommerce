import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../redux/actions/productActions'

const AdminEditProduct = () => {

    const { productId } = useParams()
    const dispatch = useDispatch()
    const { product } = useSelector(state => state.products)

    const [productImage, setProductImage] = useState(null)   
    const [productName, setProductName] = useState('')   
    const [productDescription, setProductDescription] = useState('')   
    const [productPrice, setProductPrice] = useState('')   
    const [productCategory, setProductCategory] = useState('')   
    const [productQuantity, setProductQuantity] = useState('0')
    
    useEffect(() => {
        if (!product) {
            dispatch(getProduct(productId))
        } else {
        setProductImage(product.fileName)
        setProductName(product.productName)
        setProductDescription(product.productDescription)
        setProductPrice(product.productPrice)
        setProductCategory(product.productCategory.category)
        setProductQuantity(product.productQuantity)
        }
    }, [dispatch, productId, product])

  return (
    <div>
        {product ? <><p>{productImage}</p>
        <p>{productName}</p>
        <p>{productDescription}</p>
        <p>{productPrice}</p>
        <p>{productCategory}</p>
        <p>{productQuantity}</p></> : null}
        
    </div>
  )
}

export default AdminEditProduct
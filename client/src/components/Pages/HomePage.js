import React, { useEffect } from 'react'
// Styles
import { FlexBox, GridBox } from '../styles/styles'
// Components
import ProductCard from '../Product/ProductCard'
import { getTranslatedText as t } from "../../translations/index"
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getNewArrivals } from '../../redux/actions/filterActions'
import {getProducts} from "../../redux/actions/productActions"

const HomePage = () => {

  const dispatch = useDispatch()
  const { newArrivals } = useSelector(state => state.filters)
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getNewArrivals())
  }, [dispatch])
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  
  return (
    <section style={{ textAlign: 'center' }}>
      <div style={{ backgroundImage: "url(/images/canaria2.jpg)", height: '500px', backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
      <hr />
      <>
      <h1>{t("NEW_ARRIVALS")}</h1>
      <FlexBox>
      
        <GridBox>
            {newArrivals && newArrivals.map(p => (
                <ProductCard p={p} key={p._id}/>
            ))}
        </GridBox>
        </FlexBox>
        </>
        <hr />
        <>
      <h1>{t("PRODUCTS")}</h1>
      <FlexBox>
        <GridBox>
            {products && products.map(p => (
                <ProductCard p={p} key={p._id}/>
            ))}
        </GridBox>
        </FlexBox>
        </>

    </section>
  ) 
}

export default HomePage
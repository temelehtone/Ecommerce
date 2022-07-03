import React from 'react'

import { getTranslatedText as t} from '../../translations'

// Styles
import { Box, Typography } from '@mui/material'
import { FlexBox } from '../styles/styles'
import { theme } from '../styles/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CartTable from './CartTable'
//Redux
import { useSelector } from 'react-redux'
const CartPage = () => {

const { cart } = useSelector(state => state.cart)

  return (
    <>
   {cart.length === 0 ? <Box sx={{ textAlign: 'center' }}>
    <Typography variant="h4" sx={{ m: 4 }}>{t('CART_IS_EMPTY')}</Typography>
    <a href='/'><h2>Return back to homepage</h2></a>
   </Box> : <>
   <FlexBox sx={{ backgroundColor: theme.palette.primary.color7, color: "white" }}>
        <ShoppingCartIcon sx={{ mr: 3, fontSize: 50 }} />
        <h1>{t('CART')}</h1>
      </FlexBox>
      <CartTable />
   </>}
   </>
  )
}

export default CartPage
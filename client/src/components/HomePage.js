import React, { useEffect } from 'react'
// Styles
import { FlexBox, GridBox } from './styles'
// Components
import ProductCard from './ProductCard'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { getNewArrivals } from '../redux/actions/filterActions'

const HomePage = () => {

  const dispatch = useDispatch()
  const { newArrivals } = useSelector(state => state.filters)

  useEffect(() => {
    dispatch(getNewArrivals())
  }, [dispatch])

  return (
    <section style={{ height: '100vh' }}>
      <div style={{ backgroundImage: "url(/images/canaria2.jpg)", height: '60%', backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
      <hr />
      <FlexBox sx={{mt: 2}}>
        <GridBox>
            {/* {newArrivals && newArrivals.map(p => (
                <ProductCard p={p} key={p._id}/>

            ))} */}
        </GridBox>
        </FlexBox>
    </section>
  ) 
}

export default HomePage
import React, { useEffect } from 'react'

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
      {JSON.stringify(newArrivals)}
    </section>
  ) 
}

export default HomePage
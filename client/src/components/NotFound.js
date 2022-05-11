import React from 'react'

const NotFound = ({ navigate }) => {
  return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "100px" }}>404 site not found</h1>
        <a href='/'><h2>Return back to homepage</h2></a>
      </div>
    
  )
  
}

export default NotFound
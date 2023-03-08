import React from 'react'
import { useSelector } from 'react-redux'



function Dashboard() {

  const store = useSelector( (state) => state.auth);
  const show = JSON.stringify(store.user)

  return (
    <div style={{fontSize: '20px'}}>{show ? show : 'selam'}</div>
  )
}

export default Dashboard
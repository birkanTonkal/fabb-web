import React from 'react'
import '../styles/Login.scss'
import { useEffect } from 'react'
import axios from 'axios'
import LoginLeftPanel from '../components/LoginLeftPanel'
function Login() {

useEffect(() => {
   
}, [])

const login = async () => {
    const userCredentials = await axios.get('http://localhost:5111/user/signin?email=deneme@gmail.com&password=deneme');
    console.log(userCredentials.data)
}
  return (
    <>
    <div className='login-container'>
      <LoginLeftPanel />
        <input className="logind-header">asdasdasd</input>
    </div>
    <button onClick={login}>submit</button>
    </>
  )
}

export default Login
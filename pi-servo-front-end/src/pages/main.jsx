import React, {useState, useEffect} from 'react'
import CameraStream from './camera_stream'
import Login from './login'
import { fetchPostReq } from '../fetch';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLogin = (bool) => {
    if (bool === true) {
      setIsLoggedIn(bool);
    }else{
      setIsLoggedIn(false);
    }
  }

  return (
    <div className='text-center py-5'>
      {/* <CameraStream setLoginStatus={handleLogin}/> */}
      { isLoggedIn
        ? <CameraStream setLoginStatus={handleLogin}/> :
        <Login checkLogin={handleLogin} />
      }
    </div>
  )
}

export default Main

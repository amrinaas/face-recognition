import React from 'react'
import Logo from '../Logo'

const Navigation = ({ onRouteChange, isSignIn }) => {
  return (
    isSignIn ?
    <nav style={{ display: 'flex', justifyContent:'space-between' }}>
      <Logo />
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signout')}>Sign Out</p>
    </nav> 
    :
    <nav style={{ display: 'flex', justifyContent:'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
    </nav> 

  )
}

export default Navigation
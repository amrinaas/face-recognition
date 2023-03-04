import React from 'react'
import Tilt from 'react-parallax-tilt';
import './logo.css'
import Face from './face.png'

const Logo = () => {
  return (
    <div className='ma4 mt3'>
        <Tilt className='Tilt br2 shadow-2'>
            <div className='pa3'>
                <img style={{ paddingTop: '3px', paddingLeft: '10px' }} src={Face} alt='logo' />
            </div>
        </Tilt>
    </div>
  )
}

export default Logo
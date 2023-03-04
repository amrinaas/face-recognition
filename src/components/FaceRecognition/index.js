import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center'>
        <div className={`mt2 center relative ${imageUrl ? '' : 'dn'}`}>
            <img id='inputImage' alt='face-recognition' className='center flex' src={imageUrl} width='500px' height='auto' />
            <div className='bounding-box' style={{ top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
        </div>
    </div>
  )
}

export default FaceRecognition
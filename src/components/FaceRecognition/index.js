import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center'>
        <div className='mt2 center relative'>
            <img id='inputImage' alt='face-recognition' className='center flex' src={'https://upload.wikimedia.org/wikipedia/commons/9/98/Tom_Hanks_face.jpg'} width='500px' height='auto' />
            <div className='bounding-box' style={{ top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
        </div>
    </div>
  )
}

export default FaceRecognition
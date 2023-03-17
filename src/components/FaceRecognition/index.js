import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
  const listBoundaryBox = box.map((c, d) =>
      <div className='bounding-box' key={d} style={{ top: c.topRow, right:c.rightCol, bottom: c.bottomRow, left: c.leftCol }}></div>
    );
  return (
    <div className='image-detect'>
        <div className={`center mt2 absolute ${imageUrl ? '' : 'dn'}`}>
            <img id='inputImage' alt='face-recognition' src={imageUrl} width='500px' height='auto' />
            {listBoundaryBox}
        </div>
    </div>
  )
}

export default FaceRecognition
import React from 'react'
import './imageLink.css'

const ImageLinkForm = ({ isValid, onInputChange, onSubmit, box }) => {
  return (
    <div>
        <p className='f3 tc'>{'This Magic Brain will detect faces in your pictures. Give a try!'}</p>
        <div className='form-container'>
            <div className='form center pa4 br3 shadow-5'>
                <small className='fw6'>Please insert .jpg link address!</small>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <button disabled={!isValid} className={`w-30 ${!isValid ? '' : 'grow'} f4 link ph3 pv2 dib white bg-light-purple`} onClick={onSubmit}>Detect</button>
            </div>
        </div>
      <h3 className='tc'>{box.length} face(s) has been detected</h3>
    </div>
  )
}

export default ImageLinkForm
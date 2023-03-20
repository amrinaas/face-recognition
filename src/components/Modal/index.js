import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './modal.css'

const Modal = ({ handleClose, children }) => {
  return (
    <div className="modal">
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-header">
                    <AiOutlineCloseCircle size={90} />
                    <button onClick={handleClose} type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div className="tc">
                    <h4>Ooops!</h4>	
                    <p>Something went wrong. {children}:)</p>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default Modal
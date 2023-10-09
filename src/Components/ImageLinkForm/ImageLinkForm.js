import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='ma1 mt=0 flex justify-center topper'>
            <div id="form">
                <div className="shadow-4 shade">
         <p className="f3 bt bb pa1 bg-black b gold tc">
            Turn Family & Friends Into Trump
         </p>
         <div className='flex justify-center'>
            <input type='text' required className="f2 grow" onChange={ onInputChange }/>
            <button 
            type="submit"
            className="link white bg-light-purple"
            onClick={onButtonSubmit}
            >Detect</button>
            </div>
            </div>
         </div>
        </div>
    )
}

export default ImageLinkForm;
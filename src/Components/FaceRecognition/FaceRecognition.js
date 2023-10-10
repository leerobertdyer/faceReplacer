import React from 'react';
import "./FaceRecognition.css"
import Trump from "../../trump.png"
const FaceRecognition = ({ imageUrl, boxes }) => {
    const allBoxes = boxes.map((boxData, index) => (
        <div
            key={index}
            className="boundingBox ma0"
            style={{
                top: `${boxData.top_row  * 100}%`, 
                left: `${boxData.left_col  * 100}%`, 
                width: `${(boxData.right_col - boxData.left_col) * 100}%`, 
                height: `${(boxData.bottom_row - boxData.top_row) * 100}%`, 
            }}
        >
            <img id="replacer"
                src={Trump}
                alt='Trump'
            />
        </div>
    ));

    return (
        <div className='top'>
            <div className="parent">
                <img className='ba white br3 ma0'
                    id="inputImage"
                    alt="yourfaces"
                    src={imageUrl}
                    width="400px"
                    height="400px" />
                {allBoxes}

            </div>
        </div>
    )
}

export default FaceRecognition;
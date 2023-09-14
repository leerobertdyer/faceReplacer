import React from 'react';
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import Trump from '../../trump.jpeg'
const Logo = () => {
    return (
        <div>
         <Tilt className="Tilt" options={{max: 10}}>
   <img alt="Face replacer" src={Trump} width="100%" height="100%"></img>
    </Tilt>
        </div>
    )
}

export default Logo;
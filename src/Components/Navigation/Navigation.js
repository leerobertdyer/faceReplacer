import React from 'react';
import './Navigation.css';

const Navigation = ({ setRouteLogin, isLoggedIn }) => {
    
    if (isLoggedIn){
        return(
    <div>
        <nav className="flex">
            <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('login') }}>Sign Out</p>
        </nav>
        </div>
    )}

    else {
      return(
      <div>
        <nav className="flex">
            <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('login') }}>Sign In</p>
        </nav>
        <nav className="flex">
        <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('register') }}>Register</p>
    </nav>
        </div>
    )}
    
    
}

export default Navigation
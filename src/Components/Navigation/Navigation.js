import React from 'react';
import './Navigation.css';

const Navigation = ({ setRouteLogin, isLoggedIn, isProfile }) => {

    if (isLoggedIn) {

        return (
            <div>
                <div>
                <nav className='nav1'>
                    <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('login') }}>Sign Out</p>
                    {isProfile ? (
                       <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('home') }}>Home</p> 
                    ): <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('profile') }}>Profile</p>
                }                  
                    </nav>
            </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <div className=''>
                <nav className="nav2">
                    <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('login') }}>Sign In</p>
                    <p className="f3 link dim underline pa3 pointer" onClick={() => { setRouteLogin('register') }}>Register</p>
                </nav>
            </div>
            </div>
        )
    }


}

export default Navigation
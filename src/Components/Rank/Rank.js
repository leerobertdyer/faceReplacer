import React, { Component } from 'react';

class Rank extends Component {
    render(){
    const { name, entries } = this.props
    return (
        <div className='flex justify-center rank'>
        <div className='white bg-gold br3 ba ma2 pa3 tc'>
        <p className='f4'>{`Hello ${ name }, your rank is: `}</p>
        <p id="rank">{entries}</p>
        </div>
        </div>
    )
}
}

export default Rank
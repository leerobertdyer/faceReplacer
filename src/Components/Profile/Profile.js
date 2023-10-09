import React, { Component } from 'react';
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        this.fetchPhotos()
    }

    fetchPhotos() {
        const { user } = this.props;
        const id = user.id
        fetch(`http://localhost:3001/profile/${id}`)
            .then(response => response.json())
            .then(data => {
                let temp = []
                for (const i in data) {
                    temp.push(data[i].url)
                }
                this.setState({ photos: temp })
            })
    }
    render() {
        const { user } = this.props;
        const { photos}  = this.state;
        return (
            <div className='main'>
                <div className='white bg-gold br3 ba ma2 pa3 tc'>
                    <p><span className='f1 black'>{user.name.toUpperCase()}, </span>this is your profile. I know it sucks. Working on it.</p>
                    <p>You've currently tried {user.entries} photos. Here they all are:</p>
                    <div id="photos">
                        {photos.map((photoURL, index) => (
                        <figure key={index}>
                            <img src={photoURL} alt={`pre-effect ${index+1}`}></img>
                        </figure>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
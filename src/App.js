import { Component } from 'react';
import Logo from './Components/Logo/Logo'
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

const returnClarifaiRequestOptions = (imageURL) => {
  const PAT = '8444a47486e946b4938bf1a4b6320e18';
  const USER_ID = 'leerobertdyer';
  const APP_ID = 'FaceID';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNswsS2NZGVutmKgBpxigUcVIg8dEribEGw&usqp=CAU',
      boxes: [],
      route: 'login',
      isLoggedIn: false,
      user: {
        id: '',
        name: '',
        email: "",
        joined: '',
        entries: 0
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        joined: data.joined,
        entries: data.entries
      }
    })
  }
  calcFaceLoc = (data) => {
    if (this.state.input !== ''){
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height)
    const shorthand = data.outputs[0].data.regions;
    const myBoxes = [];
  
    for (let i = 0; i < shorthand.length; i++) {
      let regions = shorthand[i].region_info.bounding_box
      myBoxes.push(regions)
    }
  
    this.setState({ boxes: myBoxes })
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: clarifaiFace.right_col * width,
      bottomRow: clarifaiFace.bottom_row * height
    }
  }
  }



  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input })
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(resp => {
        if (resp) {
         
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        console.log(this.state.user.entries)
      }
        this.calcFaceLoc(resp)
      })

  }

  onRouteChange = (route) => {
    if (route === "login") {
      this.setState({ isLoggedIn: false })
    }
    else if (route === "home") {
      this.setState({ isLoggedIn: true })
    }
    this.setState({ route: route })
  }



  render() {
    const { route, isLoggedIn, imageUrl, boxes } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="FFFFFF" className="particles" num={100} type="cobweb" bg={true} />
        {route === "home"
          ? <div>
            <div className='mb4 head'>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <Navigation isLoggedIn={isLoggedIn} setRouteLogin={this.onRouteChange} />
            </div>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </div>
          : (
            route === "login"
              ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }


      </div>
    );
  }
}

export default App;

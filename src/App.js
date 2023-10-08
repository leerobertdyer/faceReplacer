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

// Using Key from Clarifai to use their api, specifically the FaceID API:
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

  //Setting up a loadUser method to check current user in Login/Register Components
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

  //Setting up a calcFaceLoc method to use Clarifai API to locate every face in an image:
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
//An input change event to communicate with the ImageLinkForm Component. Updates the current image URL:
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  //Continuation of onInputChange, uses result to update the actual image URL state, using promises to apply API
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(resp => {
        if (resp) {
  // This part communicates with server side 'image' mainly to update the entries tab.
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
      }
  // the final promise that actually calls the calcFaceLoc method on the image:
        this.calcFaceLoc(resp)
      })

  }

  //A route method that handles 'page' changes from login/register to the actual app:
  onRouteChange = (route) => {
    if (route === "login") {
      this.setState({ isLoggedIn: false })
    }
    else if (route === "home") {
      this.setState({ isLoggedIn: true })
    }
    this.setState({ route: route })
  }

  // the actual app renderer:
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

import React, { Component } from 'react'
import Navigation from './components/Navigation'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition'
import SignIn from './components/SignIn'
import Register from './components/Register'
import ParticlesBg from 'particles-bg'
 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = JSON.parse(data).outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(image, width, height, clarifyFace);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: clarifyFace.right_col * width,
      bottomRow: clarifyFace.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    console.log('box', box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignIn: false})
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }

  onSubmit = () => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = process.env.REACT_APP_PAT_CLARIFAI;

    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = process.env.REACT_APP_USER_ID_CLARIFAI;       
    const APP_ID = process.env.REACT_APP_APP_ID_CLARIFAI;

    // Change these to whatever model and image URL you want to use
    const MODEL_ID = process.env.REACT_APP_MODEL_ID_CLARIFAI;
    const MODEL_VERSION_ID = process.env.REACT_APP_MODEL_VERSION_ID_CLARIFAI;    
    const IMAGE_URL = this.state.input;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

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

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    this.setState({ imageUrl: this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }

  render() {
    const {isSignIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={isSignIn} />
        {route === 'home' ? 
          <div>
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>  
          : ( route === 'signin' ? 
              <SignIn onRouteChange={this.onRouteChange} /> : <Register onRouteChange={this.onRouteChange} /> 
            ) 
          
          
           
    }
      </div>
    );
  }
}

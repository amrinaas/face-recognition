import React, { Component } from 'react'
import Navigation from './components/Navigation'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition'
import SignIn from './components/SignIn'
import Register from './components/Register'
import ParticlesBg from 'particles-bg'
 
const initialState = {
  input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
}
export default class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  componentDidMount() {
    console.log('App is running');
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    let boundaryBox = clarifyFace.map((a,b) => {
      let box = a.region_info.bounding_box;
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    })

    return boundaryBox;
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignIn: true})
    }
    this.setState({route: route})
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input})

    fetch(process.env.REACT_APP_API_URL+'/image', {
      method: 'put',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id,
        imageUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then(count => {
      this.displayFaceBox(this.calculateFaceLocation(count.result))
      this.setState(Object.assign(this.state.user, { entries: count.entries }))
    })
    .catch(err => console.log('error fetch image', err))
  }

  render() {
    const {isSignIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={isSignIn} />
        {route === 'home' ? 
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmit} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>  
          : ( route === 'signin' ? 
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            ) 
        }
      </div>
    );
  }
}

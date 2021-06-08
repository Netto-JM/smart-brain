import React, { useState } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  const clearState = () => {
    setInput('');
    setImageUrl('');
    setBox({});
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    });
  }

  const loadUser = (data) => {
    const {id, name, email, entries, joined} = data;
    setUser({id, name, email, entries, joined});
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * width),
    }
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onPictureSubmit = () => {
    setImageUrl(input);
      fetch('https://floating-woodland-82308.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ input })
      })
      .then(response => response.json())
      .then((response) => {
         if (response) {
          fetch('https://floating-woodland-82308.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: user.id
            })
          })
          .then(response => response.json())
          .then(entries => {
            setUser({...user,  entries})
          })
          .catch(console.log)
         }
         setBox(calculateFaceLocation(response));
      })
      .catch((err) => {
         console.log(err);
      });
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      clearState();
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOptions}
      />
      <Navigation onRouteChange = {onRouteChange} isSignedIn = {isSignedIn}/>
      { route === 'home'
        ? 
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onPictureSubmit={onPictureSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        :   route === 'signin' || route === 'signout'
            ? <Signin onRouteChange = {onRouteChange} loadUser = {loadUser}/>
            : <Register onRouteChange = {onRouteChange} loadUser = {loadUser}/> 
         
      }
    </div>
  );
}

export default App;
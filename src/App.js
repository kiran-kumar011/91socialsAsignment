import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


// Importing components.
import ContactForm from './Components/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactForm />
      </div>
    );
  }
}

export default App;

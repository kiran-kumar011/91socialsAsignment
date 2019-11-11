import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';


// Importing components.
import ContactForm from './Components/index';
import ContactInfo from './Components/info';

class App extends Component {
	state ={
		isUserAvailable: false,
	}

	

	get isUserDataAvailable()  {
		const data = Object.keys(this.props.userData);
		if(data.length) {
			return true;
		} else {
			return false;
		}
	}

	validateUserData = () => this.setState({ isUserAvailable: true });
	

  render() {
  	const { isUserAvailable } = this.state;
  	console.log(this.isUserDataAvailable, 'from app');
    return (
      <div className="App">
	      {
	      	isUserAvailable && this.isUserDataAvailable ? 
	      	(<ContactInfo data={this.props.userData}/>)
	      	:
	      	(<ContactForm update={ this.validateUserData }/>)
	      }
        
        
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		userData: state.userData
	}
}

export default connect(mapStateToProps)(App);

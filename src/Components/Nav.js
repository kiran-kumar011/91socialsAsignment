import React, { Component } from 'react';
import './Css/Nav.css';



class Nav extends Component {
  state={

  }

  componentDidMount() {
    console.log('componenetDidMount');
  }

  render() {
    return(
      <div className='header-wrapper'>
        <div>
          <a href='#'>91Socials</a>
        </div>
        <div>
          <ul className='header-links'>
            <li><a href='#'>Login</a></li>
            <li><a href='#'>SignUp</a></li>
          </ul>
        </div>
      </div>
    )
  }
}


export default Nav;
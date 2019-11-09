import React, { Component } from 'react';
import Nav from './Nav';
import FormData from '../Models/index';
import Input from './Input';

class Contacts extends Component {
	state={
		name: '',
		email: '',
		phoneNumber: '',
		address: '',
		city: '',
		pincode: '',
		password: '',
	}

	componentDidMount() {
		console.log('Contacts componet mounted');
	}

	get displaySubmitButton() {
		const { name, email, phoneNumber, address, password } = this.state;
		// return name && email && phoneNumber && address && password ? true : false;
		return true;
	}

	handleChange = e => {
		console.log(e, 'handlechange');
		this.setState({ [e.target.name]: e.target.value })
	}

	// handleChangeTextarea = e => {
	// 	console.log(e, 'handleChangeTextarea');
	// 	// this.setState({})
	// }

	submitForm = e => {
		e.preventDefault();
	}

	render() {
		console.log(this.state, 'state');
		console.log(this.displaySubmitButton, 'displaySubmitButton');
		return(
			<div>
				
				<div className='form-container'>
					<form onClick={ this.submitForm }>
					{
						FormData.map((item, ind) => {
							return(
								<Input 
									key={ind}
									{...item} 
									handlerFunction={ this.handleChange }
									value={this.state[item.name]}
								/>
							)
						})
					}
					<div className='input-wrapper'>
						<label className='text'>Address :  Flat No/Street Name/City/State</label>
						<textarea
							name='address' 
							onChange={ this.handleChange }
							rows='3'
							placeholder='Enter your address'
							value={this.state.address}
						/>
					</div>
					<div>
						{
							this.displaySubmitButton ? 
							(
								<div className='button-wrapper'>
									<button className='submit-button' type='submit' onClick={ this.submitForm }>Submit</button>	
								</div>
							)
							: 
							(<p className='text'>All the fields are Mandatory*</p>)
						}
						</div>
					</form>
				</div>
			</div>
		)
	}
}


export default Contacts;


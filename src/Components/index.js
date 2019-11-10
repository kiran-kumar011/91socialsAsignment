import React, { Component } from 'react';
import Nav from './Nav';
import FormData from '../Models/index';
import Input from './Input';



class Contacts extends Component {
	state={
		name 						: '',
		email 					: '',
		phoneNumber 		: '',
		address 				: '',
		password 				: '',
		nameError				: '',
		emailError 			: '',
		phoneNumberError: '',
		addressError		: '',
		passwordError 	: ''
	}

	componentDidMount() {
		console.log('Contacts component mounted');
	}

	get displaySubmitButton() {
		const { name, email, phoneNumber, address, password } = this.state;
		return name && email && phoneNumber && address && password ? true : false;
	}

	handleChange = e => {
		console.log(e, 'handlechange');
		this.setState({ [e.target.name]: e.target.value })
	}

	validation() {
		let nameError, emailError,  phoneNumberError, addressError, passwordError;
		const { 
			name, 
			email, 
			phoneNumber, 
			address, 
			password, 
		} = this.state;

		if(!name.trim()) {
			nameError = 'Name field cannot be empty*';
			this.setState({ nameError });
			return false;
		} else if(nameError) {
			nameError = '';
			this.setState({ nameError });
		}

		if(!email.includes('@')  || !email.includes('.')) {
			emailError= 'Please Enter valid email*';
			this.setState({ emailError });
			return false;
		} else if(emailError){
			emailError = '';
			this.setState({ emailError });
		}


		if((phoneNumber.length < 10 || phoneNumber.length > 12) 
			&& (!['0', '7', '8', '9'].indexOf(phoneNumber[0]) > -1)) {
			phoneNumberError = 'Please Enter valid Mobile Number*';
			this.setState({ phoneNumberError });
			return false;
		} else if(phoneNumberError) {
			phoneNumberError = '';
			this.setState({ phoneNumberError })
		}

		if(!address.trim()) {
			addressError = 'Please Enter you address*';
			this.setState({ addressError });
			return false;
		} else if(addressError) {
			addressError = '';
			this.setState({ addressError });
		}

		let isUpperCase = false, isNumber = false, isSpecialChar = false;
		const specialChar = '/^[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]*$/';
		const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		for(let i=0; i<password.length; i++) {

			if(specialChar.indexOf(password[i]) > -1) {
				isSpecialChar = true;
			} 

			if(password[i] === password[i].toUpperCase() && password[i] !== password[i].toLowerCase()) {
				isUpperCase = true;
			}

			if(number.indexOf(password[i]) > -1) {
				isNumber = true;
			}
		}
		const isValidPassword = isUpperCase && isNumber && isSpecialChar;


		if(!isValidPassword) {
			passwordError = "Password must contain one UpperCase, Number, and one Special Character";
			this.setState({ passwordError });
			return false;
		} else if(passwordError) {
			passwordError = '';
			this.setState({ passwordError });
		}
		return true;
	}

	submitForm = async (e) => {
		console.log('submit ')
		try {
			e.preventDefault();
			console.log('submitForm');
			const isValid = await this.validation();
			console.log('isvalid', isValid);
			if(isValid) {
				this.setState({ 
					name: '', 
					email: '', 
					phoneNumber : '', 
					address: '', 
					password : '',
					// nameError : '', 
					// emailError : '',  
					// phoneNumberError: '', 
					// addressError: '', 
					// passwordError: ''
				});
			}
		} catch(err) {
			console.log(err)
		}

	}

	render() {
		const { nameError, emailError,  phoneNumberError, addressError, passwordError } = this.state;

		const error = {
			name  			: nameError,
			email 			: emailError,
			phoneNumber : phoneNumberError,
			address 		: addressError,
			password 		: passwordError
		}

		console.log(error, 'error obj');
		return(
			<div>
				<div className='form-container'>
					<form >
					{
						FormData.map((item, ind) => {
							return(
								<Input 
									key={ind}
									{...item} 
									handlerFunction={ this.handleChange }
									value={this.state[item.name]}
									error={ error[item.name] }
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
							error={ error }
						/>
					</div>
					<div>
						{
							this.displaySubmitButton ? 
							(
								<div className='button-wrapper'>
									<button className='submit-button' type='submit' onClick={ this.submitForm }>
									Submit
									</button>	
								</div>
							)
							: 
							(
								<div className='button-wrapper'>
									<button className='submit-button' disabled>
										Submit <span className="icon has-text-danger">
									  <i className="fas fa-ban"/>
									</span>
									</button>
								</div>
							)
						}
						</div>
					</form>
				</div>
			</div>
		)
	}
}


export default Contacts;


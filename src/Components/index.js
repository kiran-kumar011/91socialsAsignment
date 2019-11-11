import React, { Component } from 'react';
import FormData from '../Models/index';
import Input from './Input';
import { connect } from 'react-redux';
import { addUserData } from '../Actions';

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
		passwordError 	: '',
		warningFields   : [],
		isButtonDisabled: false,
		successMessage: '',
	}

	get displaySubmitButton() {
		const { name, email, phoneNumber, address, password } = this.state;
		return name && email && phoneNumber && address && password ? true : false;
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	validation() {
		let nameError, emailError,  phoneNumberError, addressError, passwordError, fields = [];

		const { 
			name, 
			email, 
			phoneNumber, 
			address, 
			password, 
		} = this.state;

		if(!name.trim() || name.length < 5) {
			nameError = 'Name should be more than 4characters*';
			fields.push('name');
		} 

		if(!email.includes('@')  || !email.includes('.')) {
			emailError= 'Please Enter valid email*';
			fields.push('email')
		} 

		if((phoneNumber.length < 10) || (phoneNumber.length > 12)
			|| !(['0', '7', '8', '9'].indexOf(phoneNumber[0]) > -1)) {
			phoneNumberError = 'Please Enter valid Mobile Number*';
			fields.push('phoneNumber');
		} 

		if(!address.trim()) {
			addressError = 'Please Enter your address*';
			fields.push('address');
		} 

		let isUpperCase = false, isNumber = false, isSpecialChar = false;
		const specialChar = `/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/`;
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
			passwordError = "Must contain one UpperCase, Number, and Special Character*";
			fields.push('password');
		} 

		this.setState({
			nameError, 
			emailError,
			phoneNumberError, 
			addressError, 
			passwordError,
			warningFields: fields,
			isButtonDisabled : true
		});

		if(!nameError && !emailError && !phoneNumberError && !addressError && !passwordError) {
			return true;
		} else {
			return false;
		}
	}

	submitForm = (e) => {
		e.preventDefault();
		try {
			const isValid = this.validation();
			console.log(isValid, 'isvalid')
			if(isValid) {
				const { name, email, phoneNumber, address, password } = this.state;
				const data = {
					name,
					email,
					phoneNumber,
					address,
					password
				}

				this.props.dispatch(addUserData(data)).then(res => {
					this.setState({
						name : '',
						email: '',
						phoneNumber: '',
						address: '',
						password: '',
						successMessage: 'Successfully updated'
					},
						() => {
							setTimeout(() => {
								this.props.update()
							}, 1000)
						}
					)
				});
			} else if(!isValid) {
				this.clearErrorMeassage();
			}
		} catch(err) {
			console.log(err)
		}

	}

	clearErrorMeassage() {
		setTimeout(() => {
			this.setState({
				nameError : '', 
				emailError : '',  
				phoneNumberError: '',
				addressError: '',
				passwordError: '',
				warningFields : [],
				isButtonDisabled: false
			})
		}, 4000);
	}

	render() {
		const { 
			nameError, 
			emailError,  
			phoneNumberError, 
			addressError, 
			passwordError, 
			warningFields,
			isButtonDisabled,
			successMessage
		} = this.state;

		const error = {
			name  			: nameError,
			email 			: emailError,
			phoneNumber : phoneNumberError,
			address 		: addressError,
			password 		: passwordError
		}
		// console.log(this.props, 'props')
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
										warningFields={ warningFields }
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
								className={warningFields.includes('address') ? 'error-textarea': 'textarea'}
							/>
							<p className={error.address ? 'error': 'empty-space'}>{error.address}</p>
						</div>
						<div>
								{
									!isButtonDisabled && this.displaySubmitButton ? 
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
											<p className={ successMessage ? 'success': 'empty-space'}>{successMessage}</p>
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

function mapStateToProps(state) {
	return {
		userData: state.userData
	}
}

export default connect(mapStateToProps)(Contacts);


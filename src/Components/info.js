import React from 'react';
import ChangeCase from 'change-case';

const ContactInfo = ({ data }) => {
	console.log(data, 'ContactInfo');
	const fields = Object.keys(data);
	console.log(fields, 'fields');
	return(
		<div className='form-container'>
			<div className='user-details-wrapper'>
				<div>
					<div className='user-icon'>
						<i className="fas fa-user" />
					</div>
					<div className='info-fields'>
						<label>Name</label>
						<span className='text'>:</span>
						<span className='text'>{ChangeCase.headerCase(data['name'])}</span>
					</div>
				</div>
				<div  className='info-fields'>
					<label>Email</label>
					<span className='text'>:</span>
					<span  className='text'>{data['email']}</span>
				</div>
				<div className='info-fields'>
					<label>Mobile Number</label>
					<span className='text'>:</span>
					<span className='text'>{data['phoneNumber']}</span>
				</div>
				<div className='info-fields'>
					<label>Password</label>
					<span className='text'>:</span>
					<span className='text'>{data['password']}</span>
				</div>
				<div className='info-fields'>
					<label>Address </label>
					<span className='text'>:</span>
					<span className='text'>{data['address']}</span>
				</div>
			</div>
		</div>
	)
}



export default ContactInfo;